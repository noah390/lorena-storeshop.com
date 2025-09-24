// Checkout System - No Formspree, Direct Admin Panel Integration
const CheckoutManager = {
    // Save order to admin panel
    saveOrder(orderData) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderNumber = 'ORD' + Date.now();
        
        const order = {
            orderNumber,
            ...orderData,
            orderDate: new Date().toISOString(),
            status: 'pending'
        };
        
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Sync to Firebase
        try {
            firebase.database().ref(`orders/${orderNumber}`).set(order);
        } catch (error) {
            console.log('Firebase sync failed, order saved locally');
        }
        
        return order;
    },

    // Send email notification
    sendEmailNotification(orderData) {
        const subject = `New Order ${orderData.orderNumber} - Lorena Store`;
        const body = `
New Order Received!

Order Number: ${orderData.orderNumber}
Customer: ${orderData.customer.name}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address || 'Not provided'}

Items:
${Object.entries(orderData.items).map(([id, qty]) => `- Product ID ${id}: ${qty} items`).join('\n')}

Total: ₦${orderData.total.toLocaleString()}
Order Date: ${new Date(orderData.orderDate).toLocaleString()}

Please process this order promptly.
        `;
        
        const mailtoLink = `mailto:spanishfrenchexpress@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank');
    },

    // Send WhatsApp notification
    sendWhatsAppNotification(orderData) {
        const message = `🛍️ *New Order - Lorena Store*

📋 Order: ${orderData.orderNumber}
👤 Customer: ${orderData.customer.name}
📧 Email: ${orderData.customer.email}
📱 Phone: ${orderData.customer.phone}
📍 Address: ${orderData.customer.address || 'Not provided'}

🛒 Items: ${Object.values(orderData.items).reduce((a, b) => a + b, 0)} items
💰 Total: ₦${orderData.total.toLocaleString()}
📅 Date: ${new Date(orderData.orderDate).toLocaleString()}

Please process this order. Thank you!`;
        
        const whatsappLink = `https://wa.me/2349050120553?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    },

    // Process checkout
    processCheckout(checkoutMethod, customerData, cartItems, total) {
        const orderData = {
            customer: customerData,
            items: cartItems,
            total: total,
            method: checkoutMethod
        };
        
        // Save order
        const savedOrder = this.saveOrder(orderData);
        
        // Send notifications based on method
        if (checkoutMethod === 'whatsapp') {
            this.sendWhatsAppNotification(savedOrder);
        } else if (checkoutMethod === 'email') {
            this.sendEmailNotification(savedOrder);
        }
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Save last order for confirmation page
        localStorage.setItem('lastOrder', JSON.stringify(savedOrder));
        
        // Redirect to success page
        window.location.href = 'orderPlaced.html';
        
        return savedOrder;
    }
};
console.clear();

// Update badge from localStorage cart
let cart = JSON.parse(localStorage.getItem('cart') || '{}');
let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
if(document.getElementById("badge")) document.getElementById("badge").innerHTML = totalItems;


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxDiv.style.cssText = 'display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #eee; border-radius: 10px; margin-bottom: 15px; background: white;'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxImg.style.cssText = 'width: 80px; height: 80px; object-fit: cover; border-radius: 8px;'
    boxDiv.appendChild(boxImg)

    let productInfo = document.createElement('div')
    productInfo.style.cssText = 'flex: 1;'
    
    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxh3.style.cssText = 'margin: 0 0 5px 0; color: #333;'
    productInfo.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('₦' + ob.price + ' each')
    boxh4.appendChild(h4Text)
    boxh4.style.cssText = 'margin: 0; color: #e75480; font-weight: 600;'
    productInfo.appendChild(boxh4)
    
    boxDiv.appendChild(productInfo)
    
    // Quantity controls
    let quantityDiv = document.createElement('div')
    quantityDiv.style.cssText = 'display: flex; align-items: center; gap: 10px;'
    
    let decreaseBtn = document.createElement('button')
    decreaseBtn.textContent = '-'
    decreaseBtn.style.cssText = 'width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer; font-weight: bold;'
    decreaseBtn.onclick = () => updateQuantity(ob.id, -1)
    
    let quantitySpan = document.createElement('span')
    quantitySpan.textContent = itemCounter
    quantitySpan.id = 'qty-' + ob.id
    quantitySpan.style.cssText = 'min-width: 30px; text-align: center; font-weight: bold;'
    
    let increaseBtn = document.createElement('button')
    increaseBtn.textContent = '+'
    increaseBtn.style.cssText = 'width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer; font-weight: bold;'
    increaseBtn.onclick = () => updateQuantity(ob.id, 1)
    
    quantityDiv.appendChild(decreaseBtn)
    quantityDiv.appendChild(quantitySpan)
    quantityDiv.appendChild(increaseBtn)
    boxDiv.appendChild(quantityDiv)
    
    // Total price for this item
    let itemTotal = document.createElement('div')
    itemTotal.textContent = '₦' + (ob.price * itemCounter)
    itemTotal.id = 'total-' + ob.id
    itemTotal.style.cssText = 'font-weight: bold; color: #333; min-width: 80px; text-align: right;'
    boxDiv.appendChild(itemTotal)
    
    // Remove button
    let removeBtn = document.createElement('button')
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>'
    removeBtn.style.cssText = 'background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; transition: background 0.3s;'
    removeBtn.onmouseover = function() { this.style.background = '#c82333'; }
    removeBtn.onmouseout = function() { this.style.background = '#dc3545'; }
    removeBtn.onclick = () => removeFromCart(ob.id)
    boxDiv.appendChild(removeBtn)

    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    return cartContainer
}

// Update quantity function
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    if (cart[productId]) {
        cart[productId] += change;
        
        if (cart[productId] <= 0) {
            delete cart[productId];
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); // Refresh to update display
    }
}

// Remove from cart function
function removeFromCart(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); // Refresh to update display
    }
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Amount: ₦' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')

buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')

// Remove the link, handle navigation in JS after email is sent
// buttonLink.href = '/orderPlaced.html?'
// buttonTag.appendChild(buttonLink)

let buttonText = document.createTextNode('Proceed to Checkout')
buttonTag.style.cssText = 'background: #e75480; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold; transition: background 0.3s;'
buttonTag.onmouseover = function() { this.style.background = '#d63384'; }
buttonTag.onmouseout = function() { this.style.background = '#e75480'; }
buttonTag.appendChild(buttonText)
buttonTag.onclick = function() {
    if(Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('You need to login to make a purchase. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Show customer form
    const form = document.getElementById('customerForm');
    if(form.style.display === 'none') {
        // Pre-fill form with user data if available
        try {
            const user = JSON.parse(currentUser);
            document.getElementById('customerName').value = user.name || '';
            document.getElementById('customerEmail').value = user.identifier.includes('@') ? user.identifier : '';
            document.getElementById('customerPhone').value = user.phone || (user.identifier.match(/^[0-9]+$/) ? user.identifier : '');
        } catch (e) {
            console.log('Could not pre-fill user data');
        }
        
        form.style.display = 'block';
        buttonText.textContent = 'Place Order';
        form.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Validate customer details
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const city = document.getElementById('customerCity').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if(!name || !email || !phone || !city || !address) {
        alert('Please fill in all customer details!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Validate phone format
    if (!/^[0-9]{10,11}$/.test(phone)) {
        alert('Please enter a valid phone number (10-11 digits)!');
        return;
    }
    
    // Process order
    const orderDetails = {
        customer: { name, email, phone, city, address },
        items: cart,
        orderDate: new Date().toISOString(),
        orderNumber: 'LOR' + Date.now(),
        userId: JSON.parse(currentUser).identifier
    };
    
    // Show loading state
    buttonText.textContent = 'Processing...';
    buttonTag.disabled = true;
    
    // Send order to backend
    fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())
    .then(data => {
        // Save order locally
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(data);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('lastOrder', JSON.stringify(data));
        localStorage.removeItem('cart');
        
        // Show thank you message
        alert('🎉 Order placed successfully!\n\nThank you for your patronage, ' + name + '!\n\nOrder Number: ' + data.orderNumber + '\n\nWe appreciate your business and will contact you shortly at ' + phone + ' for delivery confirmation.\n\nA confirmation email has been sent to our team.');
        
        window.location.href = 'orderPlaced.html';
    })
    .catch(error => {
        console.error('Order submission failed:', error);
        // Fallback - still save locally and redirect
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const fallbackOrder = {
            ...orderDetails,
            id: Date.now().toString(),
            totalAmount: totalAmount,
            status: 'pending'
        };
        orders.push(fallbackOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('lastOrder', JSON.stringify(fallbackOrder));
        localStorage.removeItem('cart');
        
        // Also try to save to a backup file that admin can check
        try {
            const backupOrders = JSON.parse(localStorage.getItem('backupOrders') || '[]');
            backupOrders.push(fallbackOrder);
            localStorage.setItem('backupOrders', JSON.stringify(backupOrders));
        } catch (e) {
            console.log('Could not save backup order');
        }
        
        alert('🎉 Order placed successfully!\n\nThank you for your patronage, ' + name + '!\n\nOrder Number: ' + fallbackOrder.orderNumber + '\n\nNote: Order saved locally. Please contact us to confirm your order.');
        window.location.href = 'orderPlaced.html';
    })
    .finally(() => {
        buttonText.textContent = 'Proceed to Checkout';
        buttonTag.disabled = false;
    });
}
//dynamicCartSection()
// console.log(dynamicCartSection());

// Fetch products from backend and render cart
fetch('http://localhost:4000/api/products')
    .then(res => res.json())
    .then(products => {
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        if(document.getElementById("totalItem")) document.getElementById("totalItem").innerHTML = ('Total Items: ' + totalItems);
        let totalAmount = 0;
        Object.keys(cart).forEach(id => {
            let prod = products.find(p => String(p.id) === String(id));
            if(prod) {
                let qty = cart[id];
                totalAmount += Number(prod.price) * qty;
                dynamicCartSection(prod, qty);
            }
        });
        amountUpdate(totalAmount);
    })
    .catch(() => {
        console.log('Failed to load products');
    });





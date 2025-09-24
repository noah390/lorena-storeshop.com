// Live Chat Widget
class LiveChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.addEventListeners();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.innerHTML = `
            <div id="chat-widget" class="chat-widget">
                <div id="chat-button" class="chat-button">
                    <i class="fas fa-comments"></i>
                    <span class="chat-badge">1</span>
                </div>
                
                <div id="chat-window" class="chat-window">
                    <div class="chat-header">
                        <div class="chat-title">
                            <i class="fas fa-headset"></i>
                            Live Support
                        </div>
                        <button id="chat-close" class="chat-close">×</button>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                👋 Hi! Welcome to Lorena Store! How can I help you today?
                            </div>
                            <div class="message-time">${new Date().toLocaleTimeString()}</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Type your message..." maxlength="500">
                        <button id="chat-send"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;

        const styles = document.createElement('style');
        styles.textContent = `
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: Arial, sans-serif;
            }
            
            .chat-button {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #25d366, #128c7e);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                transition: all 0.3s;
                position: relative;
                animation: pulse 2s infinite;
            }
            
            .chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(0,0,0,0.3);
            }
            
            .chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4757;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: bounce 1s infinite;
            }
            
            .chat-window {
                position: absolute;
                bottom: 70px;
                right: 0;
                width: 350px;
                height: 450px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .chat-header {
                background: linear-gradient(135deg, #e75480, #ff6b9d);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-title {
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .chat-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .message {
                margin-bottom: 15px;
                animation: fadeInUp 0.3s ease;
            }
            
            .message-content {
                background: white;
                padding: 10px 15px;
                border-radius: 15px;
                max-width: 80%;
                word-wrap: break-word;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .bot-message .message-content {
                background: #e75480;
                color: white;
                margin-left: 0;
            }
            
            .user-message .message-content {
                background: #007bff;
                color: white;
                margin-left: auto;
            }
            
            .message-time {
                font-size: 11px;
                color: #666;
                margin-top: 5px;
                text-align: right;
            }
            
            .bot-message .message-time {
                text-align: left;
            }
            
            .chat-input-container {
                padding: 15px;
                background: white;
                border-top: 1px solid #eee;
                display: flex;
                gap: 10px;
            }
            
            #chat-input {
                flex: 1;
                padding: 10px 15px;
                border: 2px solid #eee;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
            }
            
            #chat-input:focus {
                border-color: #e75480;
            }
            
            #chat-send {
                background: #e75480;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
            }
            
            #chat-send:hover {
                background: #d63384;
                transform: scale(1.1);
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @media (max-width: 768px) {
                .chat-window {
                    width: 300px;
                    height: 400px;
                }
                
                .chat-widget {
                    bottom: 80px;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(widget);
    }

    addEventListeners() {
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');

        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatBadge = document.querySelector('.chat-badge');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            chatWindow.style.display = 'flex';
            this.isOpen = true;
            chatBadge.style.display = 'none';
            document.getElementById('chat-input').focus();
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.style.display = 'none';
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            this.handleBotResponse(message);
        }, 1000);
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    handleBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';

        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = '💰 Our products range from ₦2,000 to ₦50,000. Check our store page for current prices and special offers!';
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
            response = '🚚 We offer free delivery on orders above ₦10,000! Same-day delivery available in Lagos. Other locations take 2-3 business days.';
        } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
            response = '💳 We accept bank transfers, card payments, and cash on delivery. You can also pay via our WhatsApp checkout!';
        } else if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
            response = '🔄 We have a 7-day return policy for unused items. Contact us via WhatsApp for returns and exchanges.';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
            response = '📞 You can reach us on WhatsApp: +234 9050120553 or email: spanishfrenchexpress@gmail.com';
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = '👋 Hello! Welcome to Lorena Store! How can I assist you with your shopping today?';
        } else {
            response = '🤔 Thanks for your message! For detailed assistance, please contact us on WhatsApp: +234 9050120553 or browse our store for amazing products!';
        }

        this.addMessage(response, 'bot');
    }
}

// Initialize chat widget when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LiveChatWidget();
});
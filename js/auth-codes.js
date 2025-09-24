// Authentication Codes System
const AuthCodes = {
    // Generate 6-digit code
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    // Send code (simulated)
    async sendCode(identifier, purpose = 'verification') {
        const code = this.generateCode();
        const expiry = Date.now() + (10 * 60 * 1000); // 10 minutes
        
        // Store code in localStorage
        const codes = JSON.parse(localStorage.getItem('authCodes') || '{}');
        codes[identifier] = { code, expiry, purpose };
        localStorage.setItem('authCodes', JSON.stringify(codes));
        
        // Simulate sending (show code in alert for demo)
        if (identifier.includes('@')) {
            alert(`Email sent to ${identifier}\nVerification Code: ${code}\n(This is a demo - in production, this would be sent via email)`);
        } else {
            alert(`SMS sent to ${identifier}\nVerification Code: ${code}\n(This is a demo - in production, this would be sent via SMS)`);
        }
        
        return { success: true, message: 'Code sent successfully' };
    },

    // Verify code
    verifyCode(identifier, inputCode) {
        const codes = JSON.parse(localStorage.getItem('authCodes') || '{}');
        const storedData = codes[identifier];
        
        if (!storedData) {
            throw new Error('No verification code found');
        }
        
        if (Date.now() > storedData.expiry) {
            delete codes[identifier];
            localStorage.setItem('authCodes', JSON.stringify(codes));
            throw new Error('Verification code has expired');
        }
        
        if (storedData.code !== inputCode) {
            throw new Error('Invalid verification code');
        }
        
        // Code is valid, remove it
        delete codes[identifier];
        localStorage.setItem('authCodes', JSON.stringify(codes));
        
        return true;
    },

    // Check if code exists and is valid
    hasValidCode(identifier) {
        const codes = JSON.parse(localStorage.getItem('authCodes') || '{}');
        const storedData = codes[identifier];
        
        if (!storedData || Date.now() > storedData.expiry) {
            return false;
        }
        
        return true;
    }
};
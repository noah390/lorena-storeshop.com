// Configuration for different environments
const CONFIG = {
    development: {
        API_BASE_URL: 'http://localhost:4000/api',
        FRONTEND_URL: 'http://localhost:3000'
    },
    production: {
        API_BASE_URL: 'https://your-backend-domain.herokuapp.com/api',
        FRONTEND_URL: 'https://yourusername.github.io/my-store'
    }
};

// Detect environment
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const environment = isProduction ? 'production' : 'development';

// Export configuration
const API_BASE_URL = CONFIG[environment].API_BASE_URL;
const FRONTEND_URL = CONFIG[environment].FRONTEND_URL;

console.log(`Environment: ${environment}`);
console.log(`API Base URL: ${API_BASE_URL}`);
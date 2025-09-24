// Environment detection and configuration loader
(function() {
  const isProduction = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1' &&
                      window.location.hostname !== '' &&
                      window.location.protocol === 'https:';
  
  // For now, use the same config for both environments
  const configScript = document.createElement('script');
  configScript.src = 'js/firebase-config.js';
  
  configScript.onload = function() {
    console.log('Firebase config loaded successfully');
  };
  
  configScript.onerror = function() {
    console.error('Failed to load Firebase config');
  };
  
  document.head.appendChild(configScript);
})();
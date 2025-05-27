// QR Scanner simulation
let scannerActive = false;

function initQRScanner() {
    console.log('QR scanner initializing...');
    scannerActive = true;
    
    // Animate scanning line
    const scanLine = document.querySelector('.scan-line');
    if (scanLine) {
        scanLine.style.animation = 'scanAnimation 2s linear infinite';
    }
    
    // For demo purposes, simulate a successful scan after a few seconds
    setTimeout(() => {
        if (scannerActive) {
            // Flash the screen to simulate successful scanning
            const cameraView = document.querySelector('.camera-view');
            cameraView.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                cameraView.style.backgroundColor = 'black';
                scannerActive = false;
                
                // Show success screen
                window.simulateSuccessfulLogin();
            }, 500);
        }
    }, 4000);
}

function stopQRScanner() {
    console.log('QR scanner stopped');
    scannerActive = false;
    
    // Stop animation
    const scanLine = document.querySelector('.scan-line');
    if (scanLine) {
        scanLine.style.animation = 'none';
    }
}

// Stop scanner when leaving the page
document.getElementById('back-from-scanner').addEventListener('click', stopQRScanner);

document.addEventListener('DOMContentLoaded', () => {
    // Logo drawing animation
    const logoPath = document.querySelector('#app-logo path');
    
    if (logoPath) {
        const length = logoPath.getTotalLength();
        logoPath.style.strokeDasharray = length;
        logoPath.style.strokeDashoffset = length;
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Kiosk list drawer behavior
    const drawer = document.querySelector('.absolute.bottom-0.left-0.right-0.bg-white.rounded-t-2xl');
    const handle = document.querySelector('.w-12.h-1.bg-gray-200.rounded.mx-auto.mb-4');
    
    if (handle && drawer) {
        let isDragging = false;
        let startY;
        let startHeight;
        
        // Initialize with a partial view
        drawer.style.height = '30%';
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
        
        function startDrag(e) {
            isDragging = true;
            startY = e.clientY || e.touches[0].clientY;
            startHeight = parseInt(document.defaultView.getComputedStyle(drawer).height, 10);
            
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const y = e.clientY || (e.touches ? e.touches[0].clientY : startY);
            const height = startHeight - (y - startY);
            
            // Set limits (min 20%, max 90%)
            const windowHeight = window.innerHeight;
            const minHeight = windowHeight * 0.2;
            const maxHeight = windowHeight * 0.9;
            
            if (height > minHeight && height < maxHeight) {
                drawer.style.height = height + 'px';
            }
        }
        
        function stopDrag() {
            isDragging = false;
        }
        
        // Double-click to expand/collapse
        handle.addEventListener('dblclick', () => {
            const currentHeight = parseInt(document.defaultView.getComputedStyle(drawer).height, 10);
            const windowHeight = window.innerHeight;
            
            if (currentHeight < windowHeight * 0.5) {
                drawer.style.height = '75%';
            } else {
                drawer.style.height = '30%';
            }
        });
    }
    
    // Success screen animation
    const successCheckmark = document.querySelector('.success-checkmark');
    if (successCheckmark) {
        successCheckmark.classList.add('animate__animated', 'animate__bounceIn');
    }
});

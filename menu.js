document.addEventListener('DOMContentLoaded', () => {
    const headerText = document.querySelector('.header-text');
    const logoWrapper = document.querySelector('.logo-wrapper');
    const logoImg = document.querySelector('#header-logo');
    const root = document.documentElement; 
    // --- Settings ---
    const maxLogoSize = 30; 
    const minLogoSize = 15; 
    const shrinkScrollRange = 100; // Scroll distance to complete shrinking
    const sizeDifference = maxLogoSize - minLogoSize;

   
    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    logoWrapper.parentNode.insertBefore(placeholder, logoWrapper);

    
    let ticking = false;
    let textHeight = headerText.offsetHeight;

    function updateLogo() {
        const scrollY = window.scrollY;

       
        if (scrollY >= textHeight) {
            if (!logoWrapper.classList.contains('logo-fixed')) {
               
                logoWrapper.classList.add('logo-fixed');
                placeholder.style.height = logoWrapper.offsetHeight + 'px';
                placeholder.style.display = 'block';
            }
        } else {
           
            if (logoWrapper.classList.contains('logo-fixed')) {
                logoWrapper.classList.remove('logo-fixed');
                placeholder.style.display = 'none';
            }
        }

       
        // Calculate raw progress (0 to 1) based on scroll position
        const scrolledPast = Math.max(0, scrollY - textHeight);
        const progress = Math.min(1, scrolledPast / shrinkScrollRange);

        // Calculate the target width value
        const targetWidth = maxLogoSize - (sizeDifference * progress);
        
        // Pass the raw width value (e.g., 35.5) to CSS as a variable.
        
        root.style.setProperty('--logo-width-val', targetWidth);

        ticking = false;
    }

    // --- Event Listener ---
    window.addEventListener('scroll', () => {
        
        if (!ticking) {
            window.requestAnimationFrame(updateLogo);
            ticking = true;
        }
    }, { passive: true });
    
  
    window.addEventListener('resize', () => {
        // Recalculate text height if window size changes
        textHeight = headerText.offsetHeight;
        updateLogo();
    });

    updateLogo(); // Initial call
});
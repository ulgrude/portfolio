const elements = document.querySelectorAll('.spawn');

function checkElements() {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0) scale(1)';
        }
    });
}


checkElements();
window.addEventListener('scroll', checkElements);
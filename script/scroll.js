window.onscroll = function() {
    resizeHeader();
    hideHeader();
};

var header = document.getElementById("header");
var menuRight = document.getElementById("menu-right");

var prevScrollPos = this.scrollY;
// Cache le header quand on scroll vers le bas et l'affiche quand on scroll vers le haut
function hideHeader() {
    var currentScrollPos = this.scrollY;
    if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
    } else if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        if (!menuRight.className.includes("open")) {
            header.style.top = "-100px";
        }
    }
    prevScrollPos = currentScrollPos;
}

// Redimensionne le header quand on scroll
function resizeHeader() {
    var marginY = 10;
    var marginX = 30;
    var navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        if (!menuRight.className.includes("open")) {
            navbar.style.margin = marginY + "px " + marginX + "px";
            header.className = "dark-background";
        }
    } else {
        navbar.style.margin = (marginY + 20) + "px " + marginX + "px";
        header.removeAttribute("class");
    }
}
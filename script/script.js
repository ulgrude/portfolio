quelEstMonAge();

function quelEstMonAge() {
    var dateNaissance = new Date('1998-09-16');
    var dateAujourdhui = new Date();
    // Calcul de l'âge
    var age = dateAujourdhui.getFullYear() - dateNaissance.getFullYear();

    // Vérification si l'anniversaire est déjà passé cette année
    if (
        dateAujourdhui.getMonth() < dateNaissance.getMonth() ||
        (dateAujourdhui.getMonth() === dateNaissance.getMonth() && dateAujourdhui.getDate() < dateNaissance.getDate())
    ) {
        --age;
    }
    // On affiche
    var elements = document.getElementsByClassName("age");
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = age;
    }
}

var menuBtn = document.getElementById("menu-btn");
var menuRight = document.getElementById("menu-right");
function openRightMenu() {
    var marginY = 10;
    var marginX = 30;
    var navbar = document.getElementById("navbar");
    if (menuBtn.className.includes("open")) {
        menuBtn.className = menuBtn.className.replace("open", "").trim();
        menuRight.className = menuBtn.className.replace("open", "").trim();
        navbar.style.margin = marginY + "px " + marginX + "px";
        header.className = "dark-background";
    } else {
        menuBtn.className += " open";
        menuRight.className += " open";
        navbar.style.margin = (marginY + 20) + "px " + marginX + "px";
        header.removeAttribute("class");
    }
}

// Ferme le menu si on clique en dehors
function closeRightMenu(event) {
    var isClickInside = menuRight.contains(event.target);
    if (menuRight.className.includes("open")) {
        if (!isClickInside && !menuBtn.contains(event.target)) {
            menuRight.className = menuRight.className.replace("open", "").trim();
            menuBtn.className = menuBtn.className.replace("open", "").trim();
        }
    }
}
document.addEventListener('click', closeRightMenu);
document.addEventListener('touchstart', closeRightMenu);

// pour chaque .dotNavigation, si son frère .no-decoration a plus d'un enfant, insérer "<div class="dot active"></div>" + "<div class="dot"></div>" pour chaque autre enfant que le premier
var dotNavigations = document.getElementsByClassName("dotNavigation");
for (var i = 0; i < dotNavigations.length; i++) {
    var dotNavigation = dotNavigations[i];
    var noDecoration = dotNavigation.previousElementSibling;
    if (noDecoration.children.length > 1) {
        dotNavigation.innerHTML = "<div class=\"dot active\"></div>";
        for (var j = 1; j < noDecoration.children.length; j++) {
            dotNavigation.innerHTML += "<div class=\"dot\"></div>";
        }
    }
}

// quand on clique sur un .dot, on ajoute la classe active à ce .dot et on l'enlève à ses frères
// et on fait défiler les screenshot jusqu'à arriver au ième screenshot, où i est l'index du .dot cliqué
var dots = document.getElementsByClassName("dot");
for (var i = 0; i < dots.length; i++) {
    var dot = dots[i];
    dot.addEventListener("mouseover", function() {
        var dots = this.parentElement.children;
        for (var j = 0; j < dots.length; j++) {
            dots[j].classList.remove("active");
        }
        this.classList.add("active");
        var noDecoration = this.parentElement.previousElementSibling;
        let index = Array.prototype.indexOf.call(this.parentElement.children, this);
        noDecoration.style.marginLeft = "-" + (index * 100) + "%";
    });
}

// quand on clique sur un .sort-button, on ajoute la classe active à ce .sort-button et on l'enlève à ses frères
// et on affiche les projets correspondant à la catégorie du .sort-button cliqué en fonction du data-tag des enfants de #projets
// si on tri par date alors on affiche tous les projets
var sortButtons = document.getElementsByClassName("sort-button");
for (var i = 0; i < sortButtons.length; i++) {
    var sortButton = sortButtons[i];
    sortButton.addEventListener("click", function() {
        var sortButtons = this.parentElement.children;
        for (var j = 0; j < sortButtons.length; j++) {
            sortButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        var projets = document.getElementById("projets").children;
        var count = 0;
        for (var j = 0; j < projets.length; j++) {
            var projet = projets[j];
            if (!projet.dataset.tag) {
                continue;
            } else {
                if (this.dataset.tag === "date") {
                    // Si le tag est "date", on affiche tous les projets
                    projet.classList.add("active");
                    ++count;
                } else {
                    var tableauTags = projet.dataset.tag.split(", ");
                    if (tableauTags.includes(this.dataset.tag)) {
                        projet.classList.add("active");
                        ++count;
                    } else {
                        projet.classList.remove("active");
                    }
                }
            }
        }
        // on modifie le style background de #projets
        var projets = document.getElementById("projets");
        var nombreProjets = count;
        var pourcentage = 33;
        if (nombreProjets < 13 && nombreProjets > 1) {
            pourcentage = 60;
        } else if (nombreProjets >= 13) {
            pourcentage = 95;
        }
        projets.style.background = "radial-gradient(circle, rgb(131 8 54) 0%, rgba(64,0,24,1) " + pourcentage + "%)";
    });
}

// on simule le clic sur le .sort-button.active
var sortButtonActive = document.getElementsByClassName("sort-button active")[0];
sortButtonActive.click();



const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
});

function lenis_scroll(time) {
    lenis.raf(time);
    requestAnimationFrame(lenis_scroll);
}

requestAnimationFrame(lenis_scroll);

const maus_schein = document.querySelector(".maus_schein");

let maus_x = 0;
let maus_y = 0;

let current_x = 0;
let current_y = 0;

document.addEventListener("mousemove", function(event) {

    maus_x = event.clientX;
    maus_y = event.clientY;

});

function animate_maus_schein() {

    current_x += (maus_x - current_x) * 0.08;
    current_y += (maus_y - current_y) * 0.08;

    maus_schein.style.left = current_x + "px";
    maus_schein.style.top = current_y + "px";

    requestAnimationFrame(animate_maus_schein);

}

animate_maus_schein();

const profil_karte = document.querySelector(".profil_karte");

profil_karte.addEventListener("click", function() {

    profil_karte.classList.toggle("aktiv");

});

const karten = document.querySelectorAll(
    ".skill_card, .school_logo_card"
);

karten.forEach(function(karte) {

    karte.addEventListener("mousemove", function(event) {

        const rechteck = karte.getBoundingClientRect();

        const x = event.clientX - rechteck.left;
        const y = event.clientY - rechteck.top;

        const mitte_x = rechteck.width / 2;
        const mitte_y = rechteck.height / 2;

        const drehen_x = (y - mitte_y) / 6;
        const drehen_y = (mitte_x - x) / 6;

        karte.style.transform =
            `
            rotateX(${drehen_x}deg)
            rotateY(${drehen_y}deg)
            scale(1.10)
            `;

    });

    karte.addEventListener("mouseleave", function() {

        karte.style.transform =
            `
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
            `;

    });

});

const reveal_elemente = document.querySelectorAll(
    ".reveal, .reveal_links, .reveal_rechts, .reveal_unten"
);

function reveal_beim_scrollen() {

    reveal_elemente.forEach(function(element) {

        const position = element.getBoundingClientRect().top;

        const fenster_hoehe = window.innerHeight;

        if (
            position < fenster_hoehe - 120 &&
            position > -element.offsetHeight + 120
        ) {

            element.classList.add("reveal_aktiv");

        } else {

            element.classList.remove("reveal_aktiv");

        }

    });

}

window.addEventListener("scroll", reveal_beim_scrollen);

reveal_beim_scrollen();

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const ziel = document.querySelector(
            this.getAttribute("href")
        );

        if (ziel) {

            lenis.scrollTo(ziel, {
                duration: 1.5
            });

        }

    });

});
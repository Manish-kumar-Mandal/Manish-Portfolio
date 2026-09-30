const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const resumeLinks = document.querySelectorAll(".resume-btn");

resumeLinks.forEach((resumeLink) => {
    resumeLink.addEventListener("click", (event) => {
        if (!window.confirm("Would you like to download my resume?")) {
            event.preventDefault();
        }
    });
});

if (header && menuToggle && mainNav) {
    const closeMenu = () => {
        header.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        header.classList.toggle("menu-open", !isOpen);
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    });

    mainNav.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target instanceof Node && !header.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.matchMedia("(min-width: 1301px)").addEventListener("change", closeMenu);
}

const staggeredRevealItems = document.querySelectorAll(
    ".box, .info-card, .about-card, .drive-card, .journey-card, .stat-box, .about-quote, .creative-grid .skill-card, .project-card, .contact-card"
);

staggeredRevealItems.forEach((item, index) => {
    if (!item.hasAttribute("data-aos")) {
        item.setAttribute("data-aos", "fade-up");
    }

    if (!item.hasAttribute("data-aos-delay")) {
        item.setAttribute("data-aos-delay", String((index % 10) * 70 + 60));
    }
});

document.querySelectorAll(".skills-grid .skill-card").forEach((card) => {
    if (!card.hasAttribute("data-aos")) {
        card.setAttribute("data-aos", "fade-up");
    }

    card.setAttribute("data-aos-delay", "0");
    card.setAttribute("data-aos-duration", "400");
    card.setAttribute("data-aos-offset", "100");
});

document.querySelectorAll(".certificate-grid").forEach((grid) => {
    grid.querySelectorAll(".certificate-card").forEach((card, index) => {
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", String((index % 3) * 70));
    });
});

if (typeof AOS !== "undefined") {
    AOS.refreshHard();
}

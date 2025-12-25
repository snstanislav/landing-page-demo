document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toogle-btn");
    const menu = document.getElementById("navbar-menu");

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute("aria-expanded", !expanded);
        if (expanded) {
            toggle.classList.remove("active");
            menu.style.display = "none";
        } else {
            toggle.classList.add("active");
            menu.style.display = "flex";
        }
    });
});
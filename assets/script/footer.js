// Active Footer
const navItemLinkFooter = document.querySelectorAll(".nav__link-footer");
console.log(navItemLinkFooter);
const currentPathFooter = window.location.pathname;
navItemLinkFooter.forEach((items) => {
    if (items.getAttribute("href") === currentPathFooter) {
        items.parentElement.classList.add("active");
    }
    items.addEventListener("click", function (e) {
        removeActiveFooter();
        items.classList.add("active");
        console.log(items);
    });
});

function removeActiveFooter() {
    navItemLinkFooter.forEach((items) => {
        if (items.classList.contains("active")) {
            items.classList.remove("active");
            console.log(items);
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {

    const menuNavList = [...document.getElementById("study-menu-nav").childNodes[1].children];
    const contentItemList = [...document.getElementById("panel-overview").children];

    if (menuNavList.length === contentItemList.length) {

        menuNavList.forEach((element, index) => {
            element.addEventListener("click", () => {
                clearActiveState();

                element.classList.add("study__menu-item--active");
                contentItemList[index].classList.add("study__content-item--active");
            });
        });
    } else {
        console.error("Study block error: navigation mismatch.")
    }

    contentItemList.forEach((element, index) => {
        handleNavigationForward(element, index);
        handleNavigationBack(element, index);
    });

    function handleNavigationForward(element, index) {
        const forwardNav = [...element.children[3].children].find(el => el.classList.contains("study__content-nav--forward"));
        if (forwardNav) {
            const link = forwardNav.querySelector("a");
            link.addEventListener("click", () => {
                clearActiveState();
                if (index + 1 < contentItemList.length) {
                    contentItemList[index + 1].classList.add("study__content-item--active");
                    menuNavList[index + 1].classList.add("study__menu-item--active");
                }
            });
        }
    }

    function handleNavigationBack(element, index) {
        const backNav = [...element.children[3].children].find(el => el.classList.contains("study__content-nav--back"));
        if (backNav) {
            const link = backNav.querySelector("a");
            link.addEventListener("click", () => {
                clearActiveState();
                if (index - 1 >= 0) {
                    contentItemList[index - 1].classList.add("study__content-item--active");
                    menuNavList[index - 1].classList.add("study__menu-item--active");
                }
            });
        }
    }

    function clearActiveState() {
        menuNavList.forEach(el => el.classList.remove("study__menu-item--active"));
        contentItemList.forEach(el => el.classList.remove("study__content-item--active"));
    }
});
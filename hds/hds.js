// girdPane = document.getElementById("grid-pane");

// girdPane.style.paddingLeft = ((girdPane.offsetWidth%336)/2) + "px";

// window.addEventListener("resize", () => {
//     girdPane.style.paddingLeft = ((girdPane.offsetWidth%336)/2) + "px";
// });

splitPane = document.getElementById("split-pane");
btt = document.getElementById("btt");

btt.addEventListener("click", () => {
    splitPane.classList.toggle("split-pane-open");
});
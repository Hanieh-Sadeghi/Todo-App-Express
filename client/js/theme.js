
let root = document.querySelector("html");
let btn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

btn.addEventListener("click", function () {

  if (root.getAttribute("data-theme") === "theme-container") {
    root.setAttribute("data-theme", "canada");

  } else if (root.getAttribute("data-theme") === "canada") {
    root.setAttribute("data-theme", "Snow");
  } else if (root.getAttribute("data-theme") === "Snow") {
    root.setAttribute("data-theme", "jungl");
  } else if (root.getAttribute("data-theme") === "jungl") {
    root.setAttribute("data-theme", "theme-container");
  }

  localStorage.setItem("selectedTheme", root.getAttribute("data-theme"));

});

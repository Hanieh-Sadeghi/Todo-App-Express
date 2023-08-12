// const todoForm = document.querySelector("#task-input");
// const input = document.querySelector("#");

// const listEl = document.querySelector("#tasks");
document.addEventListener("DOMContentLoaded", function () {
    const selectIcon = document.querySelector(".select i");
    const taskMenu = document.querySelector(".task-menu");
  
    selectIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      taskMenu.classList.toggle("show-menu");
    });
  
 
    document.addEventListener("click", function (event) {
      if (!taskMenu.contains(event.target) && !selectIcon.contains(event.target)) {
        taskMenu.classList.remove("show-menu");
      }
    });
  });
  
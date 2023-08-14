console.log("hanieh");
const todoForm = document.querySelector("#task-input");
const input = document.querySelector("input[type='text']");
// const addTasks = document.getElementById('add-btn')

document.getElementById("add-btn").addEventListener("click", function () {
  console.log("add-btn");
  // debugger;
  window.addEventListener("load", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listEl = document.querySelector(".task-box");
  
    tasks.forEach(taskText => {
        const newTask = document.createElement("li");
        newTask.classList.add("task");
        newTask.innerHTML = `
            <label>
                <input type="checkbox" />
                <p class="text-center">${taskText}</p>
            </label>
            <div class="select">
                <i class="uil uil-ellipsis-h"></i>
            </div>
            <ul class="task-menu">
                <li><i class="uil uil-pen"></i>Edit</li>
                <li><i class="uil uil-trash"></i>Delete</li>
            </ul> `;
      
        listEl.appendChild(newTask);
    });
  });

////////// /////////////////////
// document.addEventListener("DOMContentLoaded", function () {
// const selectIcon = document.querySelector(".select i");
// const taskMenu = document.querySelector(".task-menu");

// selectIcon.addEventListener("click", function (event) {
// event.stopPropagation();
// taskMenu.classList.toggle("show-menu");
// });

// document.addEventListener("click", function (event) {
// if (
// !taskMenu.contains(event.target) &&
// !selectIcon.contains(event.target)
// ) {
// taskMenu.classList.remove("show-menu");
// }
// });
// });

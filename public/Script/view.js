
const todoForm = document.querySelector("#task-input");
const addTasks = document.getElementById("add-btn");
const listEl = document.querySelector(".task-box");

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    createTaskElement(taskText);
  });
}

// Create a task element
function createTaskElement(taskText) {
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
}

// Add a new task
function addNewTask() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() !== "") {
    createTaskElement(input.value.trim());
    saveTasksToLocalStorage(input.value.trim());
    input.value = ""; // Clear the input field
  }
}

// Save tasks to local storage
function saveTasksToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for loading tasks
window.addEventListener("load", loadTasks);

// Event listener for adding a new task
addTasks.addEventListener("click", addNewTask);













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

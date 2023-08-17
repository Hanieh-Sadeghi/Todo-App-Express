const todoForm = document.querySelector("#task-input");
const addTasks = document.getElementById("add-btn");
const listEl = document.querySelector(".task-box");
const deleteAllBtn = document.getElementById("clearBtn");

document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.querySelector(".task-box");

  taskList.addEventListener("click", function (event) {
    const selectIcon = event.target.closest(".select i");
    if (selectIcon) {
      const taskMenu = selectIcon.parentElement.nextElementSibling;
      taskMenu.classList.toggle("show-menu");
    }
  });

});

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

// Delete all tasks from LocalStorage and the page
function deleteAllTasks() {
  localStorage.removeItem("tasks");
  listEl.innerHTML = ""; // Clear the task list on the page
}

// Event listener for changing task status
listEl.addEventListener("change", function (event) {
  const checkbox = event.target;
  if (checkbox.type === "checkbox") {
    const textElement = checkbox.nextElementSibling;
    if (checkbox.checked) {
      textElement.style.textDecoration = "line-through";
    } else {
      textElement.style.textDecoration = "none";
    }
  }
});



// Event listener for loading tasks
window.addEventListener("load", loadTasks);

// Event listener for adding a new task
addTasks.addEventListener("click", addNewTask);

// Event listener for deleting all tasks
deleteAllBtn.addEventListener("click", deleteAllTasks);

////////// /////////////////////





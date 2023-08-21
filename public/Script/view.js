const todoForm = document.querySelector("#task-input");
const addTasks = document.getElementById("add-btn");
const listEl = document.querySelector(".task-box");
const deleteAllBtn = document.getElementById("clearBtn");
const input = document.getElementById("todoInput");

filters = document.querySelectorAll(".header span");

let TaskId;

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listEl.innerHTML = "";
  tasks.forEach((task) => {
    console.log(task.edit);
    createTaskElement(task.text, task.id, task.edit);
  });
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn);
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
  });
});

// Create a task element
function createTaskElement(taskText, id, edit) {
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.id = `task-${id}`;
  newTask.innerHTML = `
    <label>
      <input type="checkbox"} />
    </label>
    <p class="text-center" contenteditable="${edit}">${taskText}</p>
    <div class="select">
      <i class="uil uil-ellipsis-h"></i>
    </div>
    <ul class="task-menu">
      <li onclick="editTask('${id}')"><i class="uil uil-pen"></i>${edit ? 'Save' : 'Edit'}</li>
      <li onclick ='deleteTask(${id})'><i class="uil uil-trash"></i>Delete</li>
    </ul> `;
  listEl.appendChild(newTask);
}

// Add a new task
function addNewTask() {
  if (input.value.trim() !== "") {
    createTaskElement(input.value.trim());
    saveTasksToLocalStorage(input.value.trim());
    loadTasks();
    input.value = "";
  }
}

// Save tasks to local storage
function saveTasksToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, id: tasks.length, edit: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete all tasks from LocalStorage and the page
function deleteAllTasks() {
  localStorage.removeItem("tasks");
  listEl.innerHTML = "";
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

//////////////////////////////

// show menu and hide
function setupTaskMenus() {
  const taskList = document.querySelector(".task-box");

  taskList.addEventListener("click", function (event) {
    const selectIcon = event.target.closest(".select i");
    if (selectIcon) {
      const taskMenu = selectIcon.parentElement.nextElementSibling;
      taskMenu.classList.toggle("show-menu");
      showMenu(taskMenu);
    }
  });
}

function showMenu(taskMenu) {
  console.log("showMenu");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" && !taskMenu.contains(e.target)) {
      taskMenu.classList.remove("show-menu");
      console.log(taskMenu);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupTaskMenus);

// Delete Task arry
function deleteTask(deleteId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((todo) => {
    return todo.id !== +deleteId;
  });
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  loadTasks();
}

// Edit Task
function editTask(editId) {
  // console.log(editId, taskText);
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const selectedText = document.querySelector(`li#task-${editId}`).children[1]
    .textContent;
  tasks.forEach((todo) => {  
    if (todo.id === +editId) {
      todo.edit = !todo.edit;
      todo.text = selectedText;
    }
  });

  // console.log(selectedText)
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}


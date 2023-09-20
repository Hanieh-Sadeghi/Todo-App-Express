const todoForm = document.querySelector("#task-input");
const addTasks = document.getElementById("add-btn");
const listEl = document.querySelector(".task-box");
const deleteAllBtn = document.getElementById("clearBtn");
const input = document.getElementById("todoInput");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");

const taskKey = "tasks";
let identifier = 0;

let filterKind = "all";
let TaskId;

all.addEventListener("click", () => {
  filterTasks("all");
  localStorage.removeItem("backup");
  loadTasks();
});

active.addEventListener("click", () => {
  filterTasks("active");
});

completed.addEventListener("click", () => {
  filterTasks("completed");
});

// Load tasks from local storage
function loadTasks() {
  let memory = localStorage.getItem(taskKey);

  const backup = localStorage.getItem("backup");

  if (backup !== null && JSON.parse(backup.length) !== 0) {
    memory = backup;
  }

  const tasksData = JSON.parse(memory) || [];

  listEl.innerHTML = "";

  tasksData.forEach((task) => {
    createTaskElement(task.text, task.id, task.edit, task.completed);
  });
  localStorage.removeItem("backup");
}

// Create a task element
function createTaskElement(taskText, id, edit, completed) {
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.id = `task-${id}`;

  const checkbox = document.createElement("input");
  checkbox.checked = completed;
  checkbox.type = "checkbox";
  newTask.appendChild(checkbox);

  const label = document.createElement("label");
  newTask.appendChild(label);

  const paragraph = document.createElement("p");
  paragraph.classList.add("text-center");
  if (completed) paragraph.style.textDecoration = "line-through";
  paragraph.innerText = taskText;
  paragraph.contentEditable = edit;
  label.appendChild(paragraph);

  const select = document.createElement("div");
  select.classList.add("select");
  newTask.appendChild(select);

  const icon = document.createElement("i");
  icon.classList.add("ul");
  icon.classList.add("uil-ellipsis-h");
  select.appendChild(icon);

  const ul = document.createElement("ul");
  ul.classList.add("task-menu");
  newTask.appendChild(ul);

  const li1 = document.createElement("li");
  li1.addEventListener("click", () => editTask(`${id}`));
  li1.innerText = edit ? "save" : "edit";
  ul.appendChild(li1);

  const li2 = document.createElement("li");
  li2.addEventListener("click", () => deleteTask(`${id}`));
  li2.innerText = "delete";
  ul.appendChild(li2);

  const delIcon = document.createElement("i");
  delIcon.classList.add("uil");
  delIcon.classList.add("uil-pen");
  li1.appendChild(delIcon);

  const editIcon = document.createElement("i");
  editIcon.classList.add("uil");
  editIcon.classList.add("uil-trash");
  li2.appendChild(editIcon);
  listEl.appendChild(newTask);
}

// Add a new task
function addNewTask() {
  const text = input.value.trim();

  if (text) {
    createTaskElement(text, identifier, false, false);
    saveTasksToLocalStorage(text);
  }

  input.value = "";
}

// Save tasks to local storage
function saveTasksToLocalStorage(input) {
  const memory = localStorage.getItem(taskKey);
  tasks = JSON.parse(memory) || [];
  const keys = Object.keys(tasks);

  if (keys.length !== 0 || identifier !== 0) {
    identifier = +keys[keys.length - 1] + 1;
  }

  identifier;

  tasks.push({
    text: input,
    id: identifier,
    edit: false,
    completed: false,
  });

  ++identifier;
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  return;
}

// Delete all tasks from LocalStorage and the page
function deleteAllTasks() {
  localStorage.removeItem("tasks");
  localStorage.removeItem("backup");
  listEl.innerHTML = "";
}

// Event listener for changing task status
function handleCheckboxChange(event) {
  const checkbox = event.target;
  if (checkbox.type === "checkbox") {
    const textElement = checkbox.parentElement.querySelector(".text-center");
    const elemntId = checkbox.parentElement.id.replace("task-", "");
    console.log(elemntId);
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const newTask = tasks.filter((task) => {
      return task.id != elemntId;
    });

    if (checkbox.checked) {
      textElement.style.textDecoration = "line-through";

      const found = tasks.find((task) => {
        return task.id == elemntId;
      });

      if (found) {
        found.completed = true;
        newTask.push(found);
      }
    } else {
      textElement.style.textDecoration = "none";
      const found = tasks.find((task) => {
        return task.id == elemntId;
      });

      if (found) {
        found.completed = false;
        newTask.push(found);
      }
    }
    localStorage.setItem(taskKey, JSON.stringify(newTask));
  }
}

listEl.addEventListener("change", handleCheckboxChange);

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
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" && !taskMenu.contains(e.target)) {
      taskMenu.classList.remove("show-menu");
    }
  });
}

document.addEventListener("DOMContentLoaded", setupTaskMenus);

// Delete Task arry
function deleteTask(deleteId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const filteredTasks = tasks.filter((todo) => {
    return todo.id !== +deleteId;
  });
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  localStorage.setItem("backup", JSON.stringify(filteredTasks));

  loadTasks();
  console.log("hi");
}

// Edit Task
function editTask(editId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const selectedText = document
    .querySelector(`li#task-${editId}`)
    .querySelector(".text-center").textContent;
  tasks.forEach((todo) => {
    if (todo.id === +editId) {
      todo.edit = !todo.edit;
      todo.text = selectedText;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("backup", JSON.stringify(tasks));

  loadTasks();
  console.log(editId);
}

// filterTasks completed active
function filterTasks(mosi) {
  const memory = localStorage.getItem(taskKey);
  let tasks = JSON.parse(memory) || [];
  all.classList.remove("active");
  active.classList.remove("active");
  completed.classList.remove("active");

  let todos = tasks;

  if (mosi === "active") {
    active.classList.add("active");
    todos = tasks.filter((task) => {
      return task.completed === false;
    });
    // return todos;
  } else if (mosi === "completed") {
    completed.classList.add("active");
    todos = tasks.filter((task) => {
      return task.completed === true;
    });
    // return todos;
  } else {
    all.classList.add("active");
    // return tasks;
  }

  listEl.innerHTML = "";
  localStorage.setItem("backup", JSON.stringify(todos));
  loadTasks();
}

const download = document.getElementById("download");
const upload = document.getElementById("upload");
const url = "http://localhost:3000/v1/api";

download.addEventListener("click", async () => {
  const response = await fetch(url);
  const responseJson = await response.json();

  if (response.ok) {
    localStorage.setItem(taskKey, JSON.stringify(responseJson));

    listEl.innerHTML = "";
    loadTasks();
  } else {
    console.error(response.error)
  }
  
});

upload.addEventListener("click", () => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorage.getItem(taskKey),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error in fetch request:", error);
    });
});

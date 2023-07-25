const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false
  let todos = JSON.parse(localStorage.getItem("todo-list")) || [];
//   const todos = JSON.parse(localStorage.getItem("todo-list")) || [];


filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});


if (localStorage.getItem("todos")) {
  todos.map((task) => {
    createTask(task);
  });
}

taskInput.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = taskInput.value;

  if (inputValue === "") {
    return;
  }  

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));

  createTask(task);

  todoForm.reset();
  mainInput.focus();
});

function createTask(task) {
  const taskEl = document.createElement("li");

  taskEl.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskEl.classList.add("complete");
  }

  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (btn.id == todo.status || btn.id == "all") {
        liTag += `<li class="task">
                          <label for="${id}">
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                              <p class="${completed}">${todo.name}</p>
                          </label>
                          <div class="settings">
                              <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                              <ul class="task-menu">
                                  <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                  <li onclick='deleteTask(${id}, "${btn.id}")'><i class="uil uil-trash"></i>Delete</li>
                              </ul>
                          </div>
                      </li>`;
      }
    });
  }
}


// function showTodo(filter) {}
// const CompletedtodosArray = todos.filter((task) => {
//     task.isCompleted === true;
//   });

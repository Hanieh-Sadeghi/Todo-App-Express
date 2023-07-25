const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskInput.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if ((inputValue = "")) {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false
  };

  tasks.push(task)
  localStorage.setItem('tasks' , JSON.stringify(tasks))

  createTask(task)

  todoForm.reset()
  mainInput.focus()

});

function createTask(task){
    const CompletedTasksArray = tasks.filter((task) =>{
        task.isCompleted === true 
    })
}


function showTodo(filter) {
    let liTag = "";
    if (todos) {
      todos.forEach((todo, id) => {
        let completed = todo.status == "completed" ? "checked" : "";
        if (filter == todo.status || filter == "all") {
          liTag += `<li class="task">
                              <label for="${id}">
                                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                  <p class="${completed}">${todo.name}</p>
                              </label>
                              <div class="settings">
                                  <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                  <ul class="task-menu">
                                      <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                      <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                  </ul>
                              </div>
                          </li>`;
        }
      });
    }
}
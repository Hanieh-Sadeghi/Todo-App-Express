const todoForm = document.querySelector("#task-input");
const input = document.querySelector("input[type='text']");


document.getElementById("add-btn").addEventListener("click", function () {
    const todoText = document.getElementById("todoInput").value;
    if (todoText !== "") {
      const listEl = document.querySelector(".task-box");
    
      const newTask = document.createElement("li");
      newTask.classList.add("task");
      newTask.innerHTML = `
          <label>
            <input type="checkbox" />
            <p>${todoText}</p>
          </label>
          <div class="select">
            <i class="uil uil-ellipsis-h"></i>
          </div>
          <ul class="task-menu">
            <li><i class="uil uil-pen"></i>Edit</li>
            <li><i class="uil uil-trash"></i>Delete</li>
          </ul> `;
      

      listEl.appendChild(newTask);
      
      document.getElementById('todoInput').value = '';
    }
  });
  

////////// /////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const selectIcon = document.querySelector(".select i");
  const taskMenu = document.querySelector(".task-menu");

  selectIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    taskMenu.classList.toggle("show-menu");
  });

  document.addEventListener("click", function (event) {
    if (
      !taskMenu.contains(event.target) &&
      !selectIcon.contains(event.target)
    ) {
      taskMenu.classList.remove("show-menu");
    }
  });
});

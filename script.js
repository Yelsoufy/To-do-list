const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

function addTask(taskName, completed = false) {
  if (!taskName) return;

  const task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  if (completed) {
    task.querySelector(".task-check").checked = true;
    task.querySelector(".taskname").classList.add("completed");
  }

  task.querySelector(".delete").addEventListener("click", () => {
    task.remove();
    updateLocalStorage();
    updateTaskCount();
  });

  task.querySelector(".edit").addEventListener("click", () => {
    const name = task.querySelector(".taskname").textContent;
    newTaskInput.value = name;
    task.remove();
    updateLocalStorage();
    updateTaskCount();
  });

  task.querySelector(".task-check").addEventListener("change", () => {
    task.querySelector(".taskname").classList.toggle("completed");
    updateLocalStorage();
    updateTaskCount();
  });

  tasksContainer.appendChild(task);
  newTaskInput.value = "";
  updateLocalStorage();
  updateTaskCount();
}

function updateTaskCount() {
  const tasks = document.querySelectorAll(".task");
  let incompleteTasks = 0;

  tasks.forEach((task) => {
    if (!task.querySelector(".task-check").checked) {
      incompleteTasks++;
    }
  });

  countValue.textContent = incompleteTasks;
}

function updateLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll(".task");
  taskElements.forEach((task) => {
    const taskName = task.querySelector(".taskname").textContent;
    const completed = task.querySelector(".task-check").checked;
    tasks.push({ name: taskName, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  const taskName = newTaskInput.value.trim();
  if (taskName === "") {
    error.style.display = "block";
  } else {
    addTask(taskName);
    error.style.display = "none";
  }
});


window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTask(task.name, task.completed);
  });
};

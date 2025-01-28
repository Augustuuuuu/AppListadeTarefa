// Seleciona elementos do DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");

// Carrega tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para salvar tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para renderizar tarefas
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Texto da tarefa
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = "task-text";
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#888";
    }

    // Botões de ação
    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", () => deleteTask(index));

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    li.appendChild(taskText);
    li.appendChild(taskActions);
    taskList.appendChild(li);
  });
}

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

// Função para editar tarefa
function editTask(index) {
  const newText = prompt("Editar tarefa:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Função para excluir tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Alternar tema
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
});

// Evento para adicionar tarefa
taskForm.addEventListener("submit", addTask);

// Renderiza as tarefas ao carregar a página
renderTasks();
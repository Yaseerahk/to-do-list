// Get DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add new todo
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ text: task, completed: false });
    updateLocalStorage();
    renderTodos();
    todoInput.value = "";
  }
});

// Render todos to the DOM
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">X</button>
    `;
    todoList.appendChild(li);
  });
}

// Toggle completed state
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  updateLocalStorage();
  renderTodos();
}

// Delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  updateLocalStorage();
  renderTodos();
}

// Save to localStorage
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

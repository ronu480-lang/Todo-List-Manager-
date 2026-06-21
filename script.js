const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

showTodos();

addBtn.addEventListener("click", addTodo);

function addTodo() {
  let task = todoInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  let newTodo = {
    id: Date.now(),
    text: task,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  showTodos();

  todoInput.value = "";
}

function showTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter(function(todo) {
      return todo.completed === false;
    });
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter(function(todo) {
      return todo.completed === true;
    });
  }

  filteredTodos.forEach(function(todo) {
    let li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
      </div>

      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

function toggleTodo(id) {
  todos = todos.map(function(todo) {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }

    return todo;
  });

  saveTodos();
  showTodos();
}

function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  saveTodos();
  showTodos();
}

filterBtns.forEach(function(button) {
  button.addEventListener("click", function() {
    filterBtns.forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFilter = button.getAttribute("data-filter");

    showTodos();
  });
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editId = null;

showTodos();

addBtn.addEventListener("click", addTodo);

function addTodo() {
  let task = todoInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  if (editId !== null) {
    todos = todos.map(function(todo) {
      if (todo.id === editId) {
        todo.text = task;
      }
      return todo;
    });

    editId = null;
    addBtn.innerText = "Add";
    addBtn.classList.remove("update-mode");
  } else {
   let newTodo = {
  id: Date.now(),
  text: task,
  completed: false,
  date: new Date().toLocaleDateString(), // Date
  time: new Date().toLocaleTimeString()  // Time
};
    todos.push(newTodo);
  }

  saveTodos();
  showTodos();
  todoInput.value = "";
}

function showTodos() {
  todoList.innerHTML = "";

  todos.forEach(function(todo) {
    let li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">

        <div>
  <span class="task-text ${todo.completed ? "completed" : ""}">
    ${todo.text}
  </span>
  <br>
  <small class="task-time">
    📅 ${todo.date} &nbsp;&nbsp; 🕒 ${todo.time}
  </small>
</div>
      </div>

      <div class="action-buttons">
        <button type="button" class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
        <button type="button" class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
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

function editTodo(id) {
  let todo = todos.find(function(todo) {
    return todo.id === id;
  });

  todoInput.value = todo.text;
  editId = id;
  addBtn.innerText = "Update";
  addBtn.classList.add("update-mode");
  todoInput.focus();
}

function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  if (editId === id) {
    editId = null;
    addBtn.innerText = "Add";
    addBtn.classList.remove("update-mode");
    todoInput.value = "";
  }

  saveTodos();
  showTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
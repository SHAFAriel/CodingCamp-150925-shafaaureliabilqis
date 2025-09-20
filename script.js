const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

function renderTodos(list = todos) {todoList.innerHTML = "";
    if (list.length === 0) {todoList.innerHTML = `<tr><td
        colspan="4" class="empty">No Task Found</td></tr>`;
        return;
    }
    list.forEach((todo, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `<td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed? "DONE" : "PENDING"}</td>
        <td>
            <button onclick="toggleStatus(${index})">Toggle
        </button>
        <button onclick="deleteTask(${index})">Delete</button>
        </td>
        `;
        todoList.appendChild(row);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please enter both task and date!");
        return;
    }

    todos.push({ task, date, completed: false });
    taskInput.value = "";
    dateInput.value = "";

    renderTodos();
});

function toggleStatus(index) {
    todos[index].completed = !
    todos[index].completed;
    renderTodos();
}

function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Delete all task?")) {todos = [];
        renderTodos();
    }
});

filterBtn.addEventListener("click", () => {
    const date = dateInput.value;
    if (!date) {
        alert("Please select a date to filter!");
        return;
    }
    const filtered = todos.filter(todo => todo.date === date);
    renderTodos(fltered);
});

renderTodos();
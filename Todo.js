function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") return;

    var task = {
        text: taskText,
        completed: false,
        dateAdded: new Date().toLocaleString()
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    var pendingTasksList = document.getElementById("pendingTasks");
    var completedTasksList = document.getElementById("completedTasks");

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach(function(task, index) {
        var listItem = document.createElement("li");
        listItem.textContent = task.text + " (Added: " + task.dateAdded + ")";
        listItem.onclick = function() {
            toggleCompleted(index);
        };

        if (task.completed) {
            listItem.classList.add("completed");
            completedTasksList.appendChild(listItem);
        } else {
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.onclick = function(event) {
                event.stopPropagation();
                deleteTask(index);
            };
            listItem.appendChild(deleteButton);
            pendingTasksList.appendChild(listItem);
        }
    });
}

// Initialize tasks array
var tasks = [];
renderTasks();

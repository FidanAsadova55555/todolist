"use strict";

const button = document.querySelector("button");
const input = document.querySelector("input");
const todolist = document.querySelector(".todolist");
document.addEventListener("DOMContentLoaded", loadTasks);


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.checked);
    });
}

function addTaskToDOM(taskText, isChecked) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("taskitem");
    taskElement.style.display = "flex";
    taskElement.style.justifyContent = "space-between";
    taskElement.style.alignItems = "center";

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    if (isChecked) {
        taskTextElement.style.textDecoration = "line-through";
    }
    taskElement.appendChild(taskTextElement);

    const together = document.createElement("div");
    together.classList.add("vmeste");

    const checked = document.createElement("input");
    checked.classList.add("check");
    checked.type = "checkbox";
    checked.checked = isChecked; 
    checked.addEventListener("click", () => {
        taskTextElement.style.textDecoration = checked.checked ? "line-through" : "none";
        saveTasksToLocalStorage(); 
    });

    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", (f) => {
        f.preventDefault();
        taskElement.remove();
        saveTasksToLocalStorage(); 
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("ri-delete-bin-5-fill");

    deleteButton.appendChild(deleteIcon);

    together.appendChild(checked);
    together.appendChild(deleteButton);
    
    taskElement.appendChild(together);
    
    todolist.appendChild(taskElement);
}
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll(".taskitem");
    taskItems.forEach(item => {
        const text = item.querySelector("span").textContent;
        const checked = item.querySelector(".check").checked;
        tasks.push({ text, checked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

button.addEventListener("click", (event) => {
    event.preventDefault();

    if (!input.value.trim()) {
        alert("Please add something!");
    } else {
        addTaskToDOM(input.value.trim(), false);
        input.value = ""; 
        saveTasksToLocalStorage(); 
    }
});


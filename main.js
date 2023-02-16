let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Arr to store tasks
let arrayOfTasks = [];

// Check If There Is Task In Local Storage
if(localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

add.onclick = function (){
    if (input.value !== "") {
        addTaskToArr(input.value); //Add Task to Array of tasks
        input.value = ""; //Empty input field
    }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    } 
})

function addTaskToArr(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks)
};

function addElementsToPageFrom(arrayOfTasks){
    // Empty tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task Is Done
        if(task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Add Delete Button To Task
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}
// add Elements To Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
// Get Elements From Local Storage
function getDataFromLocalStorage () {
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
// Filtering Array Of Tasks  
function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter ((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}
// Toggle Status Of The Task Object
function toggleStatusTaskWith(taskId) {
    for (i = 0 ; i < arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks); 
}
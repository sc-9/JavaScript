//Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collections');
const clearBtn = document.querySelector('.clear-tasks');

//Load Event Listeners
loadEventListerners();

function loadEventListerners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTasks);
}

//Get Task
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create a text node and append it to li
        li.appendChild(document.createTextNode(task));
        //create a new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-minus-circle" aria-hidden="true"></i>'
        //Append link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}


//Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
        return false;
    }

    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create a text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear the input field
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete?')) {
        e.target.parentElement.parentElement.remove();

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTask() {
    if(confirm('Do you want to delete the entire list?')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

   clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
    window.location.reload();
}


function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else task.style.display = 'none';
    });
}
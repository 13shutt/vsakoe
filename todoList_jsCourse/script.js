const form = document.querySelector('#task-form');
const taskField = document.querySelector('#task');
const tasksList = document.querySelector('#tasks-list');
const numberOfTasks = document.querySelector('#tasks-counter');
const clearBtn = document.querySelector('#clearBtn');
const allTasksBtn = document.querySelector('#allTasksBtn');
const doneTasksBtn = document.querySelector('#doneTasksBtn');

loadAllEventListeners();

function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    document.addEventListener('DOMContentLoaded', tasksCounter);
    form.addEventListener('submit', addTask);
    form.addEventListener('submit', tasksCounter);
    tasksList.addEventListener('click', removeTask);
    tasksList.addEventListener('click', doneTask);
    tasksList.addEventListener('click', tasksCounter);
    clearBtn.addEventListener('click', clearTasks);
    clearBtn.addEventListener('click', tasksCounter);
    doneTasksBtn.addEventListener('click', showDoneTasks);
    allTasksBtn.addEventListener('click', showAllTasks);
};

function getTasks() {
    let tasks;
    
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';

        const doneItem = document.createElement('a');
        doneItem.innerHTML = '<i class="fa fa-check">';

        const removeItem = document.createElement('a');
        removeItem.className = 'delete-item secondary-content';
        removeItem.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(doneItem);
        li.appendChild(document.createTextNode(task));
        li.appendChild(removeItem);

        tasksList.appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
    if(taskField.value == '') {
        alert('Add a task!!!');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';

        const doneItem = document.createElement('a');
        doneItem.innerHTML = '<i class="fa fa-check">';

        const removeItem = document.createElement('a');
        removeItem.className = 'delete-item secondary-content';
        removeItem.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(doneItem);
        li.appendChild(document.createTextNode(taskField.value));
        li.appendChild(removeItem);

        storeTaskInLocalStorage(taskField.value);

        tasksList.appendChild(li);
        taskField.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function doneTask(e) {
    if(e.target.classList.contains('fa-check') && e.target.parentElement.parentElement.classList.contains('done-item') != true) {
        e.target.parentElement.parentElement.classList.add('done-item');
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    } else {
        e.target.parentElement.parentElement.classList.remove('done-item');
    }
}

function clearTasks() {
    while(tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
    }
    localStorage.clear();
}

function tasksCounter() {
    let counter = 0;
    document.querySelectorAll('.collection-item').forEach(function(task) {
        if (task.classList.contains('done-item') != true) {
            counter++;
        }
    });
    numberOfTasks.innerHTML = `${counter} tasks left`;
}

function showDoneTasks() {
    document.querySelectorAll('.collection-item').forEach(function(task) {
        if (task.classList.contains('done-item') != true) {
            task.classList.add('hidden');
        }
    });
}

function showAllTasks() {
    document.querySelectorAll('.collection-item').forEach(function(task) {
        if (task.classList.contains('hidden') == true) {
            task.classList.remove('hidden');
        }
    });
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
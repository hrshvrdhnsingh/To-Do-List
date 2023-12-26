//Changing color
function changeColor(){
    let doc = document.querySelector('.to-do-card');
    doc.classList.toggle('dark-mode');
}
//Variables
let newTask = document.querySelector('.text-holder');
let listTask = document.querySelector('.taskslist');
let form = document.querySelector('.add-task');
let submitbtn = document.querySelector('.submit-btn');

//Creating JSON object in local storage
function saveTasks(){
    localStorage.setItem('TASKS', JSON.stringify(TASKS));
}
//Retrieving data from local storage
function retrieveTask(){
    const taskJSON = localStorage.getItem('TASKS');
    return JSON.parse(taskJSON) || [] ;
}

//Function to add tasks
function addTask(taskName){
    //creating a final div to stor input and buttons
    let task_div = document.createElement('div');
    task_div.classList.add("tasks");

    //creating the inside input
    let inside = document.createElement('input');
    inside.classList.add('text');
    inside.type = 'text';
    inside.value = taskName;
    inside.setAttribute('readonly','readonly');
    task_div.appendChild(inside);
    console.log(task_div);
   
    //creating edit button
    let editbox = document.createElement('button');
    editbox.classList.add('edit');
    editbox.innerText = 'Edit';
    task_div.appendChild(editbox);

    //creating delete button
    let deletebox = document.createElement('button');
    deletebox.classList.add('delete');
    deletebox.innerText = 'Delete';
    task_div.appendChild(deletebox);
    
    //Adding the formed div to the list of task
    console.log(task_div);
    listTask.appendChild(task_div);
    //updateTasksArray();
    //Event Listener for edit button
    editbox.addEventListener('click', () => {
        if(editbox.innerText.toLowerCase() == 'edit'){
            editbox.innerText = 'Save';
            inside.removeAttribute('readonly');
            inside.focus();
            console.log("Editing..");
        }
        else{
            editbox.innerText = 'Edit';
            inside.setAttribute('readonly','readonly');
            console.log('Edited');
            //TASKS.push(inside.value);
            console.log(TASKS); 
        }
        updateTasksArray();

    })
    //Event Listener for the deletc button
    deletebox.addEventListener('click', () => {
        listTask.removeChild(task_div);
        console.log('Deleted');
        updateTasksArray();
    })

}
//Updating the JSON file in the local storage as and as more tasks are being created, edited or deleted.
function updateTasksArray() {
    TASKS = Array.from(document.querySelectorAll('.tasks input.text')).map(input => input.value);
    saveTasks(TASKS);
}

//Get tasks from localStorage
let TASKS = retrieveTask();

//Attaching the local data to main data
TASKS.forEach(list => addTask(list));

//Calling the Submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let str = newTask.value;
    newTask.value = '';
    console.log(str);
    if(!str || !str.trim()) return;
    //Adding to the taskslist after taking input
    addTask(str);
    TASKS.push(str);
    saveTasks(TASKS);

})

function loadTasks() {
    listTask.innerHTML = ''; // Clear existing tasks
    TASKS.forEach(task => addTask(task));
}

loadTasks(); // Load tasks when the page loads
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
   { userId: 1, id: 1, title: "Task Ticket 1", completed: false },
   { userId: 1, id: 2, title: "Task Ticket 2", completed: false },
   { userId: 1, id: 3, title: "Task Ticket 3", completed: false },
   { userId: 1, id: 4, title: "Task Ticket 4", completed: true },
   { userId: 1, id: 5, title: "Task Ticket 5", completed: false }
];


function addTask() {
   const input = document.getElementById('todoInput');
   if (input.value === '') return;

   const newId = tasks.length + 1;

   const newTask = {
      userId: 1,
      id: newId,
      title: input.value,
      completed: false,
   };
   tasks.push(newTask);
   input.value = '';
   saveTasks();
   renderTasks();
}

function toggleComplete(id) {
   const task = tasks.find(t => t.id === id);
   task.completed = !task.completed;
   saveTasks();
   renderTasks();
}

function editTask(id) {
   const newTitle = prompt("Edit task title:");
   if (newTitle) {
      const task = tasks.find(t => t.id === id);
      task.title = newTitle;
      saveTasks();
      renderTasks();
   }
}

function deleteTask(id) {
   tasks = tasks.filter(task => task.id !== id);
   saveTasks();
   renderTasks();
}

function saveTasks() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(filter) {
   renderTasks(filter);
}

function renderTasks(filter = 'all') {
   const todoList = document.getElementById('todoList');
   todoList.innerHTML = '';
   const filteredTasks = tasks.filter(task => {
      if (filter === 'active')
         return !task.completed;
      if (filter === 'completed') 
         return task.completed;
      return true; // for 'All' 
   });
   
   filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
            <span>${task.title}</span>
            <div>
               <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
               <button onclick="editTask(${task.id})">Edit</button>
               <button onclick="deleteTask(${task.id})">Delete</button>
               </div>
               `;
               todoList.appendChild(li);
            });
         }
         

// Initial render
renderTasks();
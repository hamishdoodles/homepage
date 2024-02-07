document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        const tasksList = document.getElementById('tasksList');
        const li = document.createElement('li');
        
        // Choose a random cute animal head emoji
        const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Set the emoji and task text
        li.innerHTML = `${randomEmoji} ${taskInput.value}`;
        li.addEventListener('click', function() {
            if (!this.classList.contains('done')) {
                this.innerHTML = `💀 ${this.innerHTML.slice(2)}`;
                this.classList.add('done');
            } else {
                const originalEmoji = emojis.find(emoji => emoji === this.innerHTML.trim().charAt(0));
                this.innerHTML = `${originalEmoji} ${this.innerHTML.slice(2)}`;
                this.classList.remove('done');
            }
            updateTask(this);
        });

        tasksList.appendChild(li);

        // Store task
        saveTask(taskInput.value, randomEmoji, false);
        taskInput.value = ''; // Clear input field
    }
}

function saveTask(task, emoji, done) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, emoji, done });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksList = document.getElementById('tasksList');
    tasks.forEach(taskObj => {
        const li = document.createElement('li');
        li.innerHTML = `${taskObj.done ? '💀' : taskObj.emoji} ${taskObj.task}`;
        if (taskObj.done) {
            li.classList.add('done');
        }
        li.addEventListener('click', function() {
            this.classList.toggle('done');
            if (this.classList.contains('done')) {
                this.innerHTML = `💀 ${this.innerHTML.slice(2)}`;
            } else {
                this.innerHTML = `${taskObj.emoji} ${this.innerHTML.slice(2)}`;
            }
            updateTask(this);
        });
        tasksList.appendChild(li);
    });
}

function updateTask(liElement) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = Array.from(liElement.parentNode.children).indexOf(liElement);
    if (tasks[taskIndex]) {
        tasks[taskIndex].done = liElement.classList.contains('done');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

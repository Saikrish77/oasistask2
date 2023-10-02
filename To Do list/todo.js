const tasks = [];
function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false, timestamp: new Date() });
        newTaskInput.value = '';
        renderTasks();
    }
}
function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.text;

        if (task.completed) {
            taskElement.classList.add('completed');
        }

        const taskActions = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskActions.appendChild(editButton);
        taskActions.appendChild(completeButton);
        taskActions.appendChild(deleteButton);

        taskElement.appendChild(taskActions);

        if (task.completed) {
            completedTasksList.appendChild(taskElement);
        } else {
            pendingTasksList.appendChild(taskElement);
        }
    });
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
function editTask(index) {
    const updatedText = prompt('Edit task:', tasks[index].text);
    if (updatedText !== null) {
        tasks[index].text = updatedText;
        renderTasks();
    }
}
function deleteTask(index) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        tasks.splice(index, 1);
        renderTasks();
    }
}
renderTasks();
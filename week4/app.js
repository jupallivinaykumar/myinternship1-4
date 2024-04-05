document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index);
        taskList.appendChild(taskItem);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = newTaskInput.value.trim();

        if (taskText) {
            const newTask = {
                text: taskText,
                completed: false,
            };

            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            const taskItem = createTaskItem(newTask, tasks.length - 1);
            taskList.appendChild(taskItem);
            newTaskInput.value = '';
        }
    });

    function createTaskItem(task, index) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.index = index;

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskItem.appendChild(taskText);

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-task-button');
        editButton.textContent = 'Edit';
        taskActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-task-button');
        deleteButton.textContent = 'Delete';
        taskActions.appendChild(deleteButton);

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = task.completed;
        completeCheckbox.addEventListener('change', () => {
            task.completed = completeCheckbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskText.classList.toggle('completed-task', task.completed);
        });
        taskItem.appendChild(completeCheckbox);

        taskItem.appendChild(taskActions);

        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Enter the new task text:');
            if (newTaskText) {
                task.text = newTaskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskText.textContent = newTaskText;
            }
        });

        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskItem.remove();
        });

        taskText.classList.toggle('completed-task', task.completed);

        return taskItem;
    }
});
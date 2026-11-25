 class TaskManager {
 constructor(currentId=0) {
 this.tasks = [];
 this.currentId = currentId;
 }

 addTask(nombre,description,dueDate,estado){

    this.currentId++;

    this.tasks.push({
        id: this.currentId,
        name: nombre,
        description: description,
        dueDate: dueDate,
        status : 'POR HACER'
    });
}

deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
        if (task.id !== taskId) {
            newTasks.push(task);
        }
    }

    this.tasks = newTasks;
}

save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

load() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
        this.currentId = this.tasks.reduce(function (maxId, task) {
            return Math.max(maxId, task.id);
        }, 0);
    }
}

createTaskHtml(task) {
    const isDone = task.status === 'Hecha';

    return `
        <article class="card" data-task-id="${task.id}">
            <div class="card-body">
                <div class="d-flex align-items-start gap-2">
                    <input class="form-check-input mt-1" type="checkbox" ${isDone ? 'checked' : ''} aria-label="${isDone ? 'Marcar como pendiente' : 'Marcar como hecha'}">
                    <h4 class="h6 card-title flex-grow-1 mb-0 ${isDone ? 'text-decoration-line-through' : ''}">${task.name}</h4>
                    <span class="badge estado ${isDone ? 'estado-done' : ''}">${task.status}</span>
                </div>
                <p class="card-text small text-secondary mt-2 mb-0">${task.description}</p>
                <button class="delete-button btn btn-danger btn-sm mt-2">Eliminar</button>
            </div>
            <div class="card-footer small text-secondary">Entrega: ${task.dueDate}</div>
        </article>
    `;
}

render() {
    const taskList = document.getElementById('taskList');
    const doneTaskList = document.getElementById('doneTaskList');

    if (!taskList || !doneTaskList) {
        return;
    }

    taskList.innerHTML = this.tasks
        .filter(task => task.status !== 'Hecha')
        .map(task => this.createTaskHtml(task))
        .join('');

    doneTaskList.innerHTML = this.tasks
        .filter(task => task.status === 'Hecha')
        .map(task => this.createTaskHtml(task))
        .join('');
}
}

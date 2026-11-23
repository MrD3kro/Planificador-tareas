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
}
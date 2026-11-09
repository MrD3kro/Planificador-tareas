

const newTaksForm = document.querySelector('#newTaskForm');
const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput')
const newTaskDateInput = document.querySelector('#newTaskDateInput');
const newTaskStatus = document.querySelector('#newTaskStatus');
const formAlert = document.querySelector('#formAlert');


Swal.fire({
  title: "Como ver el modal de agregar tarea?",
  icon: "info",
  html: `Da <kbd>Click</kbd> en el boton <strong>+</strong> en la nav pill de abajo al lado de month
`
});

newTaksForm.addEventListener('submit', function(event){
    event.preventDefault();


    const data = {
        name : newTaskNameInput.value,
        description: newTaskDescriptionInput.value,
        date : newTaskDateInput.value,
        status : newTaskStatus.value
    }

    const errors = validFormFielInput(data);
    for (let i = 0; i < errors.length; i++) {
           Swal.fire({
  icon: "error",
  title: "Oops...",
  text: errors[i],
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
        
    }
    if (errors.length == 0 ) {
       Swal.fire({
  title: "Bien hecho!",
  text: "Se agregó tu tarea",
  icon: "success"
});
    }
   
})

function validFormFielInput(data){
    const errors = [];
     if (data.name.trim() === '' && data.description.trim() === '' &&  data.date.trim() === '' && data.status.trim() === '') {
        errors.push('Los campos no pueden estar vacios')
    }else{

    
    
    if (data.name.trim() === '') {
        errors.push('El nombre no puede estar vacio');
    }
    if (data.description.trim() === ''){
        errors.push('La descripcion no puede estar vacia');
    }
      if (data.date.trim() === ''){
        errors.push('La fecha no puede estar vacia');
    }
  if (data.status.trim() === ''){
        errors.push('El estado no puede estar vacio');
    }}
   
    return errors;
}

  
const taskManager = new TaskManager();
console.log(taskManager.tasks); 
  
const app = document.getElementById('app');

        function setView(v) {
            document.querySelectorAll('[data-only]').forEach(e => e.hidden = e.dataset.only !== v);
            document.querySelectorAll('[data-go]').forEach(b => b.classList.toggle('active', b.dataset.go === v));
        }

        function toggleTheme() {
            app.dataset.bsTheme = app.dataset.bsTheme === 'dark' ? 'light' : 'dark';
        }

        const cal = document.getElementById('cal');
        ['L', 'M', 'X', 'J', 'V', 'S', 'D'].forEach(d => cal.insertAdjacentHTML('beforeend', `<div class="dow">${d}</div>`));
        const ev = { 15: ['Estudio', '#F6C6D8'], 28: ['Tarea 1', '#BFE3C8'], 30: ['Entrega', '#F8E7A6'] };
        for (let i = 0; i < 35; i++) {
            const n = i - 2, e = ev[n];
            cal.insertAdjacentHTML('beforeend',
                `<div class="${n === 28 ? 'today' : ''}">${n > 0 && n <= 31 ? n : ''}${e ? `<span class="ev" style="background:${e[1]}">${e[0]}</span>` : ''}</div>`);
        }


        // Cambia el texto y las clases del badge según el estado
function setEstado(badge, estado) {
    badge.classList.remove('estado-pendiente', 'estado-done');
    if (estado === 'Pendiente') badge.classList.add('estado-pendiente');
    if (estado === 'Hecha') badge.classList.add('estado-done');
    badge.textContent = estado;
}

document.querySelectorAll('.task-list input[type="checkbox"]').forEach(function (checkbox) {
    const card = checkbox.closest('.card');
    const title = card.querySelector('.card-title');
    const badge = card.querySelector('.estado');

    // Estado al que vuelve si se desmarca:
    // si ya estaba "Hecha" vuelve a "Pendiente", si no, a la que tenía
    const estadoPrevio = badge.textContent === 'Hecha' ? 'Pendiente' : badge.textContent;

    checkbox.addEventListener('change', function () {
        // Tachado según el estado del checkbox
        title.classList.toggle('text-decoration-line-through', checkbox.checked);

        if (checkbox.checked) {
            setEstado(badge, 'Hecha');
            checkbox.setAttribute('aria-label', 'Marcar como pendiente');
        } else {
            setEstado(badge, estadoPrevio);
            checkbox.setAttribute('aria-label', 'Marcar como hecha');
        }
    });
});
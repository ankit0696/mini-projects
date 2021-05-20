const from = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const tick = document.getElementById('tick')

const todos = JSON.parse(localStorage.getItem('todos'))
if (todos) {
  todos.forEach((todo) => {
    addTodo(todo)
  })
}

from.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})

input.addEventListener('keyup', (e) => {
  if (input.value.length > 0) {
    tick.style.color = 'green'
  } else {
    tick.style.color = '#b6b6b6'
  }
})

function addTodo(todo) {
  let todoText = input.value
  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    let todoEl = document.createElement('li')
    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }
    //remove todo
    todoEl.innerHTML = '<i class="far fa-times-circle delete"></i>' + todoText
    let tickEl = todoEl.getElementsByTagName('i')
    tickEl[0].addEventListener('click', (e) => {
      todoEl.remove()
      updateLS()
    })
    //strike out todo
    todoEl.addEventListener('click', (e) => {
      todoEl.classList.toggle('completed')
      updateLS()
    })

    todosUL.appendChild(todoEl)

    input.value = ''
    input.focus()
    updateLS()
  }
}

function updateLS() {
  todosEL = document.querySelectorAll('li')
  const todos = []
  todosEL.forEach((todoEL) => {
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains('completed'),
    })
  })
  // console.log(todos)
  localStorage.setItem('todos', JSON.stringify(todos))
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/todos/sw.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err))
  })
}

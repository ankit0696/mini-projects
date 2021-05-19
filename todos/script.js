const from = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

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
  console.log(todos)
  localStorage.setItem('todos', JSON.stringify(todos))
}

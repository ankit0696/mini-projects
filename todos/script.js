const from = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

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

    todoEl.innerHTML = '<i class="far fa-times-circle delete"></i>' + todoText
    let tickEl = todoEl.getElementsByTagName('i')
    tickEl[0].addEventListener('click', (e) => {
      todoEl.remove()
    })
    todoEl.addEventListener('click', (e) => {
      todoEl.classList.toggle('completed')
    })

    todosUL.appendChild(todoEl)

    input.value = ''
  }
}
const from = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const tick = document.getElementById('tick')
const deleteAll = document.getElementById('delete-container')

const todos = JSON.parse(localStorage.getItem('todos'))
const swipeValue = 100
let todoCount = 0

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
  e.preventDefault()
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
    todoEl.innerHTML =
      '<i class="far fa-circle circle"></i><span>' +
      todoText +
      '</span><i class="far fa-times-circle delete"></i>'

    //remove todo
    let tickEl = todoEl.getElementsByTagName('i')
    tickEl[1].addEventListener('click', (e) => {
      todoEl.remove()
      todoCount--
      updateRemoveBtn()
      updateLS()
    })

    let x1, x2, y1, y2, moved

    todoEl.addEventListener('touchstart', (e) => {
      x1 = e.touches[0].clientX
      y1 = e.touches[0].clientY
    })
    todoEl.addEventListener('touchmove', (e) => {
      x2 = e.touches[0].clientX
      y2 = e.touches[0].clientY
      moved = x2 - x1
      if (moved > 0) {
        todoEl.style.marginLeft = moved + 'px'
      }
    })
    todoEl.addEventListener('touchend', (e) => {
      if (x1 + swipeValue < x2) {
        todoEl.remove()
        todoCount--
        updateRemoveBtn()
        updateLS()
      } else {
        todoEl.style.marginLeft = 0
      }
    })
    //strike out todo
    todoEl.addEventListener('click', (e) => {
      todoEl.classList.toggle('completed')
      updateLS()
    })

    todosUL.appendChild(todoEl)
    todoCount++
    updateRemoveBtn()

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
  localStorage.setItem('todos', JSON.stringify(todos))
}

function updateRemoveBtn() {
  let removeBtn = document.getElementById('delete-all')
  if (todoCount > 2) {
    if (removeBtn == null) {
      let deleteBtn = document.createElement('button')
      deleteBtn.classList.add('delete-all')
      deleteBtn.id = 'delete-all'
      deleteBtn.innerText = 'Remove all tasks'
      deleteAll.appendChild(deleteBtn)
      deleteBtn.addEventListener('click', () => {
        let todosList = document.querySelectorAll('li')
        if (todosList) {
          todosList.forEach((item) => {
            item.remove()
            updateLS()
          })
        }
      })
    } else {
    }
  } else {
    if (removeBtn) {
      removeBtn.remove()
    }
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/todos/sw.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err))
  })
}

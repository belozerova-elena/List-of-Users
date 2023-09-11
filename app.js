const list = document.querySelector('.js-list')
const filter = document.querySelector('.js-filter')
let USERS = []

filter.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase()
  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(value)
  )
  render(filteredUsers)
})

async function start() {
  list.innerHTML = 'Loading...'
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    USERS = data
    render(data)
  } catch (err) {
    list.style.color = 'red'
    list.innerHTML = err.message
  }
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = 'No matched users'
  } else {
    const html = users.map(toHTML).join('')
    list.innerHTML = html
  }
}

function toHTML(user) {
  return `
    <li class="list-users__item">
      ${user.name}
      <p class="list-users__item-email">${user.email}</p>
    </li>
  `
}

start()
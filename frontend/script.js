const API = ''
const token = localStorage.getItem('token')

async function login() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  const data = await res.json()
  if (data.token) {
    localStorage.setItem('token', data.token)
    window.location.href = "dashboard.html"
  }
}

async function getUserInfo() {
  const res = await fetch(`${API}/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await res.json()
  document.getElementById('info').innerText = `Usuario: ${data.username} | Rango: ${data.rank}`
  loadExecutorScript(data.rank)
}

async function activarKey() {
  const key = document.getElementById('keyinput').value
  const res = await fetch(`${API}/activate-key`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ key })
  })
  const data = await res.json()
  alert(data.success ? `Rango actualizado a: ${data.newRank}` : data.error)
  getUserInfo()
}

async function getGames() {
  const res = await fetch(`${API}/mygames`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const games = await res.json()
  const list = document.getElementById('gamesList')
  list.innerHTML = ""
  games.forEach(game => {
    const li = document.createElement('li')
    li.innerText = `${game.name} (ID: ${game.placeId})`
    list.appendChild(li)
  })
}

function loadExecutorScript(rank) {
  let script = ""
  if (rank === "basic") {
    script = `loadstring(game:HttpGet("https://tuweb.com/basic.lua"))()`
  } else if (rank === "pro" || rank === "owner") {
    script = `loadstring(game:HttpGet("https://tuweb.com/pro.lua"))()`
  } else {
    script = "Activa una key para obtener tu script."
  }
  document.getElementById('executorScript').innerText = script
}

if (window.location.pathname.includes("dashboard")) {
  getUserInfo()
  getGames()
}

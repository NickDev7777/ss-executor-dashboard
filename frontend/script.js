function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user && pass) {
    localStorage.setItem('user', user);
    window.location.href = 'dashboard.html';
  } else {
    alert('Completa ambos campos.');
  }
}

function activarKey() {
  const key = document.getElementById('keyinput').value;
  if (key) {
    localStorage.setItem('rank', key.startsWith('pro') ? 'pro' : key.startsWith('own') ? 'owner' : 'basic');
    alert('Key activada: ' + localStorage.getItem('rank'));
  }
}

function cargarPanel() {
  const user = localStorage.getItem('user');
  const rank = localStorage.getItem('rank') || 'basic';
  const info = document.getElementById('info');
  const games = document.getElementById('gamesList');
  const script = document.getElementById('executorScript');

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  info.innerHTML = `<p>Bienvenido, <b>${user}</b> | Rango: <b>${rank}</b></p>`;

  // Lista de juegos simulada
  const juegos = [
    { id: '123', nombre: 'Obby 2.0', players: 40 },
    { id: '456', nombre: 'Survival Map', players: 65 },
    { id: '789', nombre: 'Escape Room', players: 10 }
  ];

  games.innerHTML = '';
  for (const juego of juegos) {
    if (rank === 'basic' && juego.players > 50) continue;
    games.innerHTML += `<li><b>${juego.nombre}</b> (${juego.players} jugadores) - ID: ${juego.id}</li>`;
  }

  script.innerText = `loadstring(game:HttpGet("https://tuweb.vercel.app/ss.lua"))()`;
}

if (window.location.pathname.includes('dashboard')) cargarPanel();


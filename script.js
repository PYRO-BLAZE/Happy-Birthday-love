// Music toggle
const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
toggle.onclick = () => {
  if (music.paused) { music.play(); toggle.textContent='🔊'; }
  else { music.pause(); toggle.textContent='🔇'; }
};

// Love-letter toggle
document.getElementById('giftBtn').onclick = () => {
  document.getElementById('love-letter').classList.toggle('hidden');
};

// Countdown
const birthday = new Date('2025-08-15T00:00:00');
function updateTimer(){
  const now = new Date();
  const diff = birthday - now;
  if(diff <= 0) { document.getElementById('timer').textContent = "Happy Birthday!"; return; }
  const d = Math.floor(diff/1000/60/60/24);
  const h = Math.floor((diff/1000/60/60)%24);
  const m = Math.floor((diff/1000/60)%60);
  const s = Math.floor((diff/1000)%60);
  document.getElementById('days').textContent=d;
  document.getElementById('hours').textContent=h;
  document.getElementById('minutes').textContent=m;
  document.getElementById('seconds').textContent=s;
}
setInterval(updateTimer,1000);
updateTimer();

// Gallery
let current = 0;
const images = document.querySelectorAll('.gallery img');
function showNext(){
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}
images[0].classList.add('active');
setInterval(showNext, 4000);

// Particles
const particles = document.getElementById('particles');
const icons = ['❤️','💗','🌸','🌷','💖','🌹'];
function createParticle(){
  const span = document.createElement('span');
  span.textContent = icons[Math.floor(Math.random()*icons.length)];
  span.style.position='absolute';
  const size = Math.random()*30 + 20;
  span.style.fontSize = size + 'px';
  span.style.left = Math.random()*100 + '%';
  span.style.top = '100%';
  span.style.opacity = Math.random()*0.8 + 0.2;
  particles.appendChild(span);
  let upward = 0;
  const speed = Math.random()*2 + 1;
  function move(){
    upward += speed;
    span.style.top = 100 - upward + '%';
    if(upward > 110) { span.remove(); }
    else requestAnimationFrame(move);
  }
  move();
}
setInterval(createParticle,300);

// Rain
function createRainDrop() {
  const drop = document.createElement('div');
  drop.classList.add('raindrop');
  drop.style.left = Math.random() * 100 + 'vw';
  drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
  drop.style.top = -20 + 'px';
  document.getElementById('rain').appendChild(drop);
  setTimeout(() => drop.remove(), 2000);
}
setInterval(createRainDrop, 50);

// Fireworks on click
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth; canvas.height = innerHeight;
window.onresize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
canvas.addEventListener('click', e => createFirework(e.clientX, e.clientY));

function createFirework(x, y){
  const petals = [];
  const hue = Math.random()*360;
  for(let i=0;i<40;i++){
    petals.push({
      x, y,
      vx:(Math.random()-0.5)*5,
      vy:(Math.random()-0.5)*5,
      life:Math.random()*40+40
    });
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    petals.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2*Math.PI);
      ctx.fillStyle = `hsl(${hue},100%,50%)`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy; p.life--;
    });
    const alive = petals.filter(p=>p.life>0);
    if(alive.length){
      requestAnimationFrame(draw);
      petals.length = 0;
      alive.forEach(p=>petals.push(p));
    }
  }
  draw();
}

// Diary
document.getElementById('saveDiary').onclick = () => {
  const text = document.getElementById('diary').value;
  localStorage.setItem('birthdayDiary', text);
  alert('Diary saved! ❤️');
};
window.onload = ()=>{
  const saved = localStorage.getItem('birthdayDiary');
  if(saved) document.getElementById('diary').value = saved;
};


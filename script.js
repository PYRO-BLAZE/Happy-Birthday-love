// ⭐ Music toggle
const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
toggle.onclick = () => {
  if (music.paused) { music.play(); toggle.textContent='🔊'; }
  else { music.pause(); toggle.textContent='🔇'; }
};

// 🎁 Gift & love-letter reveal
document.getElementById('giftBtn').onclick = () => {
  document.getElementById('love-letter').classList.toggle('hidden');
};

// ⏳ Countdown to her birthday (adjust date!)
const birthday = new Date('2025-08-15T00:00:00');
function updateTimer(){
  const now = new Date();
  const diff = birthday - now;
  if(diff <= 0){ document.getElementById('timer').textContent = "Happy Birthday!"; return; }
  const d = Math.floor(diff/1000/60/60/24);
  const h = Math.floor(diff/1000/60/60)%24;
  const m = Math.floor(diff/1000/60)%60;
  const s = Math.floor(diff/1000)%60;
  document.getElementById('days').textContent=d;
  document.getElementById('hours').textContent=h;
  document.getElementById('minutes').textContent=m;
  document.getElementById('seconds').textContent=s;
}
setInterval(updateTimer,1000);
updateTimer();

// 📷 Simple gallery slider
let current = 0;
const images = document.querySelectorAll('.gallery img');
function showNext(){
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}
images[0].classList.add('active');
setInterval(showNext, 4000);

// 🌸 Floating particles (hearts & flowers)
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
  const move = () => {
    upward += speed;
    span.style.top = 100 - upward + '%';
    if(upward > 110){ span.remove(); }
    else requestAnimationFrame(move);
  };
  move();
}
setInterval(createParticle,300);

// 🎆 Fireworks on click
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

canvas.addEventListener('click', (e) => {
  createFirework(e.clientX, e.clientY);
});

function createFirework(x, y){
  const particles = [];
  const hue = Math.random()*360;
  for(let i=0;i<30;i++){
    particles.push({
      x, y,
      vx: (Math.random()-0.5)*4,
      vy: (Math.random()-0.5)*4,
      life: Math.random()*30+30
    });
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
      ctx.fillStyle = `hsl(${hue},100%,50%)`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    });
    particles = particles.filter(p => p.life>0);
    if(particles.length) requestAnimationFrame(draw);
  }
  draw();
}

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- ดอกไม้ไฟ ---
class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.particles = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.y -= 5;
      if (this.y <= this.targetY) {
        this.explode();
        this.exploded = true;
      }
    } else {
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
      });
      this.particles = this.particles.filter(p => p.alpha > 0);
    }
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
      });
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
      ctx.fill();
    } else {
      this.particles.forEach(p => {
        ctx.fillStyle = `rgba(${p.color.split('rgb(')[1].slice(0,-1)},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
        ctx.fill();
      });
    }
  }

  isDead() {
    return this.exploded && this.particles.length === 0;
  }
}

let fireworks = [];

setInterval(() => {
  fireworks.push(new Firework());
}, 500);

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 35, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach(fw => {
    fw.update();
    fw.draw();
  });

  fireworks = fireworks.filter(fw => !fw.isDead());

  animateTitle();
  requestAnimationFrame(animate);
}

animate();

// --- ตัวหนังสือลอยขึ้นลง + RGB ---
const title = document.getElementById('title');
let angle = 0;

function animateTitle() {
  angle += 0.05;
  title.style.transform = `translate(-50%, ${-50 + Math.sin(angle)*20}px)`;
  const r = Math.floor(Math.sin(angle*2)*127 + 128);
  const g = Math.floor(Math.sin(angle*1.5)*127 + 128);
  const b = Math.floor(Math.sin(angle*1.8)*127 + 128);
  title.style.color = `rgb(${r},${g},${b})`;

  // เลื่อนซ้ายขวาแบบช้า
  const x = Math.sin(angle/2)*50;
  title.style.left = `calc(50% + ${x}px)`;
}

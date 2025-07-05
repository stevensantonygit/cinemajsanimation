const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let frame = 0;
let act = 1;
const villagers = [];
const cornKernels = [];
const popcorns = [];

class Tamo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.walking = false;
    this.walkFrame = 0;
    this.mood = "curious";
    this.mouthOpen = false;
    this.chewing = false;
    this.chewFrame = 0;
  }

  walkTo(targetX) {
    this.targetX = targetX;
    this.walking = true;
  }

  update() {
    if (this.walking) {
      this.walkFrame++;
      const diff = this.targetX - this.x;
      if (Math.abs(diff) > 2) {
        this.x += diff * 0.02;
      } else {
        this.x = this.targetX;
        this.walking = false;
        this.walkFrame = 0;
      }
    }
    
    if (this.chewing) {
      this.chewFrame++;
      if (this.chewFrame > 60) {
        this.chewing = false;
        this.chewFrame = 0;
      }
    }
  }

  draw() {
    this.update();
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(3, 3);
    
    const walkOffset = this.walking ? Math.sin(this.walkFrame / 8) * 2 : 0;
    const bobOffset = Math.sin(frame / 30) * 1;
    
    ctx.translate(0, bobOffset);
    
    ctx.fillStyle = "#228B22";
    ctx.beginPath();
    ctx.ellipse(-8, 5, 12, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(8, 5, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 25);
    ctx.stroke();
    
    ctx.fillStyle = "#D2691E";
    ctx.beginPath();
    ctx.arc(0, -20, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = "#654321";
    ctx.beginPath();
    ctx.ellipse(0, -28, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#000";
    if (this.mood === "curious") {
      ctx.beginPath();
      ctx.arc(-4, -24, 2, 0, Math.PI * 2);
      ctx.arc(4, -24, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, -15, 4, 0, Math.PI);
      ctx.stroke();
    } else if (this.mood === "scared") {
      ctx.beginPath();
      ctx.arc(-4, -24, 3, 0, Math.PI * 2);
      ctx.arc(4, -24, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -12, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.mood === "surprised") {
      ctx.beginPath();
      ctx.arc(-4, -24, 2.5, 0, Math.PI * 2);
      ctx.arc(4, -24, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -12, 3, 0, Math.PI * 2);
      ctx.stroke();
    } else if (this.mood === "happy") {
      ctx.beginPath();
      ctx.arc(-4, -24, 2, 0, Math.PI * 2);
      ctx.arc(4, -24, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -15, 6, 0, Math.PI);
      ctx.stroke();
    }
    
    if (this.chewing) {
      const chewOffset = Math.sin(this.chewFrame / 4) * 2;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(0, -12 + chewOffset, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-12, 8 + walkOffset);
    ctx.moveTo(0, 0);
    ctx.lineTo(12, 8 - walkOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 25);
    ctx.lineTo(-8, 40 + walkOffset * 2);
    ctx.moveTo(0, 25);
    ctx.lineTo(8, 40 - walkOffset * 2);
    ctx.stroke();
    
    ctx.restore();
  }
}
class Villager {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bob = Math.random() * 100;
    this.mood = "curious";
  }

  draw() {
    const offset = Math.sin((frame + this.bob) / 20) * 2;
    
    ctx.save();
    ctx.translate(this.x, this.y + offset);
    ctx.scale(2.5, 2.5);

    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.arc(0, -15, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#228B22";
    ctx.beginPath();
    ctx.ellipse(0, 5, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(-3, -18, 1, 0, Math.PI * 2);
    ctx.arc(3, -18, 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, -12, 3, 0, Math.PI);
    ctx.stroke();
    
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 20);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(-6, 30);
    ctx.moveTo(0, 20);
    ctx.lineTo(6, 30);
    ctx.stroke();
    
    ctx.restore();
  }
}

class CornKernel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 3 + Math.random() * 2;
    this.readyToPop = false;
    this.popTimer = 0;
    this.collected = false;
    this.inPot = false;
    this.popped = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2;
    
    if (this.y > canvas.height - 50) {
      this.y = canvas.height - 50;
      this.vy *= -0.3;
      this.vx *= 0.8;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class Popcorn {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = -Math.random() * 12 - 3;
    this.size = 8 + Math.random() * 6;
    this.rotation = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.1;
    this.bounces = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.3;
    this.rotation += this.spin;
    
    if (this.y > canvas.height - 50 && this.vy > 0) {
      this.y = canvas.height - 50;
      this.vy *= -0.6;
      this.vx *= 0.9;
      this.bounces++;
    }
    
    if (this.bounces > 2) {
      this.vx *= 0.98;
      this.vy *= 0.98;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    ctx.fillStyle = "#FFFACD";
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.ellipse(-this.size * 0.3, -this.size * 0.2, this.size * 0.4, this.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

let tamo;
let pot;

function drawJungleBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#87CEEB");
  gradient.addColorStop(1, "#98FB98");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#228B22";
  for (let i = 0; i < 8; i++) {
    const x = i * (canvas.width / 7);
    const height = 150 + Math.sin(frame / 50 + i) * 20;
    ctx.fillRect(x, canvas.height - height, 60, height);
    
    ctx.fillStyle = "#32CD32";
    ctx.beginPath();
    ctx.arc(x + 30, canvas.height - height, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#228B22";
  }
  
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function drawHutBackground() {
  ctx.fillStyle = "#654321";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, 0, 50, canvas.height);
  ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
  ctx.fillRect(0, 0, canvas.width, 100);
  
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(canvas.width / 2 - 60, canvas.height - 120, 120, 30);
  
  const fireHeight = 30 + Math.sin(frame / 8) * 10;
  ctx.fillStyle = "#FF4500";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 30, canvas.height - 90);
  ctx.lineTo(canvas.width / 2 - 10, canvas.height - 90 - fireHeight);
  ctx.lineTo(canvas.width / 2 + 10, canvas.height - 90 - fireHeight);
  ctx.lineTo(canvas.width / 2 + 30, canvas.height - 90);
  ctx.fill();
  
  ctx.fillStyle = "#FF8C00";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 20, canvas.height - 90);
  ctx.lineTo(canvas.width / 2 - 5, canvas.height - 90 - fireHeight * 0.8);
  ctx.lineTo(canvas.width / 2 + 5, canvas.height - 90 - fireHeight * 0.8);
  ctx.lineTo(canvas.width / 2 + 20, canvas.height - 90);
  ctx.fill();
  
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 10, canvas.height - 90);
  ctx.lineTo(canvas.width / 2 - 3, canvas.height - 90 - fireHeight * 0.6);
  ctx.lineTo(canvas.width / 2 + 3, canvas.height - 90 - fireHeight * 0.6);
  ctx.lineTo(canvas.width / 2 + 10, canvas.height - 90);
  ctx.fill();
  
  if (pot) {
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.ellipse(pot.x, pot.y, 40, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#654321";
    ctx.beginPath();
    ctx.ellipse(pot.x, pot.y - 30, 45, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawText(text, y, alpha = 1, size = 32, color = "white") {
  ctx.fillStyle = `rgba(${color === "white" ? "255, 255, 255" : color}, ${alpha})`;
  ctx.font = `${size}px Comic Sans MS`;
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeText(text, canvas.width / 2, y);
  ctx.fillText(text, canvas.width / 2, y);
}

function setupAct1() {
  tamo = new Tamo(100, canvas.height - 100);
  
  for (let i = 0; i < 8; i++) {
    cornKernels.push(new CornKernel(canvas.width / 2 + i * 15 - 60, canvas.height - 60));
  }
  
  setTimeout(() => {
    tamo.walkTo(canvas.width / 2 - 100);
  }, 2000);
}

function drawAct1() {
  drawJungleBackground();
  
  cornKernels.forEach(kernel => {
    if (!kernel.collected) {
      kernel.draw();
    }
  });
  
  tamo.draw();
  
  if (frame < 120) {
    drawText("🌿 Deep in the jungle... 🌿", 100, frame / 120, 36, "34, 139, 34");
  } else if (frame < 240) {
    drawText("Lives a curious young man named Tamo", 100, (frame - 120) / 120, 32, "255, 255, 255");
  } else if (frame < 360) {
    drawText("Tamo: 'What are these strange seeds?'", 100, (frame - 240) / 120, 28, "255, 255, 0");
  } else if (frame < 480) {
    drawText("*Tamo carefully gathers each kernel*", 100, (frame - 360) / 120, 30, "255, 255, 255");
  } else if (frame < 600) {
    drawText("Tamo: 'Time to investigate at home!'", 100, (frame - 480) / 120, 28, "255, 255, 0");
  }
  
  if (frame > 360 && cornKernels.length > 0) {
    cornKernels.forEach((kernel, index) => {
      if (Math.abs(kernel.x - tamo.x) < 150 && !kernel.collected) {
        kernel.x += (tamo.x - kernel.x) * 0.2;
        kernel.y += (tamo.y - 40 - kernel.y) * 0.2;
        
        if (Math.abs(kernel.x - tamo.x) < 30 && Math.abs(kernel.y - (tamo.y - 40)) < 30) {
          kernel.collected = true;
        }
      }
    });
    
    if (frame > 550) {
      cornKernels.forEach(kernel => {
        if (!kernel.collected) {
          kernel.collected = true;
        }
      });
    }
  }
  
  cornKernels.forEach((kernel, index) => {
    if (kernel.collected) {
      kernel.x = tamo.x + Math.sin(frame / 15 + index) * 12;
      kernel.y = tamo.y - 40 + Math.cos(frame / 20 + index) * 6;
      kernel.draw();
    }
  });
  
  frame++;
  
  if (frame % 100 === 0) {
    console.log(`Act 1 - Frame: ${frame}, Collected: ${cornKernels.filter(k => k.collected).length}/${cornKernels.length}, Tamo at: ${Math.round(tamo.x)}`);
  }
  
  if (frame === 500) {
    console.log("Transitioning to Act 2!");
    act = 2;
    frame = 0;
    setupAct2();
    return;
  } 
  
  requestAnimationFrame(drawAct1);
}

function setupAct2() {
  tamo = new Tamo(200, canvas.height - 100);
  pot = { x: canvas.width / 2, y: canvas.height - 120 };
  
  let collectedCount = 0;
  cornKernels.forEach(kernel => {
    if (kernel.collected) {
      collectedCount++;
      kernel.x = tamo.x + Math.random() * 30 - 15;
      kernel.y = tamo.y - 30;
      kernel.inPot = false;
      kernel.popped = false;
    }
  });
  
  if (collectedCount === 0) {
    cornKernels.forEach(kernel => {
      kernel.collected = true;
      kernel.x = tamo.x + Math.random() * 30 - 15;
      kernel.y = tamo.y - 30;
      kernel.inPot = false;
      kernel.popped = false;
    });
  }
  
  setTimeout(() => {
    tamo.walkTo(canvas.width / 2 - 80);
  }, 1000);
  
  drawAct2();
}

function drawAct2() {
  drawHutBackground();
  
  tamo.draw();
  
  cornKernels.forEach((kernel, index) => {
    if (kernel.collected && !kernel.inPot) {
      if (frame < 200) {
        kernel.x = tamo.x + Math.sin(frame / 15 + index) * 15;
        kernel.y = tamo.y - 35 + Math.cos(frame / 20 + index) * 8;
      }
      kernel.draw();
    }
  });

  if (frame < 100) {
    drawText("Back at Tamo's hut....", 100, frame / 100, 36, "255, 140, 0");
  } else if (frame < 200) {
    drawText("Tamo: 'I'll cook these over the fire!'", 100, (frame - 100) / 100, 30, "255, 255, 0");
  } else if (frame < 300) {
    drawText("He tosses the strange seeds into the pot...", 100, (frame - 200) / 100, 28, "255, 255, 255");
  } else if (frame < 400) {
    drawText("The pot starts to heat up...", 100, (frame - 300) / 100, 30, "255, 100, 100");
  } else if (frame < 500) {
    drawText("Something magical is about to happen!", 100, (frame - 400) / 100, 28, "255, 255, 0");
  }
  
  if (frame > 200 && frame < 350) {
    cornKernels.forEach(kernel => {
      if (kernel.collected && !kernel.inPot) {
        kernel.x += (pot.x - kernel.x) * 0.15;
        kernel.y += (pot.y - kernel.y) * 0.15;
        
        if (Math.abs(kernel.x - pot.x) < 25 && Math.abs(kernel.y - pot.y) < 25) {
          kernel.inPot = true;
        }
      }
    });
  }
  
  frame++;
  
  if (frame % 100 === 0) {
    console.log(`Act 2 - Frame: ${frame}, Kernels in pot: ${cornKernels.filter(k => k.inPot).length}/${cornKernels.filter(k => k.collected).length}`);
  }
  
  if (frame === 400) {
    console.log("Transitioning to Act 3!");
    act = 3;
    frame = 0;
    setupAct3();
    return;
  }
  
  requestAnimationFrame(drawAct2);
}

function setupAct3() {
  tamo.mood = "curious";
  popcorns.length = 0;
  
  setTimeout(() => {
    tamo.mood = "surprised";
  }, 2000);
  
  setTimeout(() => {
    tamo.mood = "scared";
  }, 4000);
  
  drawAct3();
}

function drawAct3() {
  drawHutBackground();
  
  if (frame > 200) {
    canvas.style.transform = `translate(${Math.sin(frame / 3) * 3}px, ${Math.cos(frame / 4) * 3}px)`;
  }
  
  if (frame > 150) {
    cornKernels.forEach((kernel, index) => {
      if (kernel.inPot && !kernel.popped && frame > 150 + index * 30) {
        for (let i = 0; i < 4; i++) {
          popcorns.push(new Popcorn(
            kernel.x + Math.random() * 30 - 15, 
            kernel.y + Math.random() * 30 - 15
          ));
        }
        kernel.popped = true;
      }
    });
  }
  
  popcorns.forEach(popcorn => {
    popcorn.update();
    popcorn.draw();
  });
  
  tamo.draw();
  
  if (frame < 100) {
    drawText("The heat builds up...", 100, frame / 100, 32, "255, 100, 100");
  } else if (frame < 200) {
    drawText("Suddenly...", 100, (frame - 100) / 100, 36, "255, 255, 0");
  } else if (frame < 300) {
    drawText("POP! POP! POP!", 100, (frame - 200) / 100, 42, "255, 0, 0");
  } else if (frame < 400) {
    drawText("Tamo: 'AHHH! The corn is attacking!'", 100, (frame - 300) / 100, 30, "255, 255, 0");
  } else if (frame < 500) {
    drawText("White fluffy projectiles everywhere!", 100, (frame - 400) / 100, 28, "255, 255, 255");
  } else if (frame < 600) {
    drawText("Tamo: 'I must defend myself!'", 100, (frame - 500) / 100, 30, "255, 255, 0");
  }
  
  frame++;
  
  if (frame === 400) {
    act = 4;
    frame = 0;
    setupAct4();
    return;
  }
  
  requestAnimationFrame(drawAct3);
}

function setupAct4() {
  tamo.mood = "scared";
  
  setTimeout(() => {
    tamo.mood = "surprised";
    tamo.chewing = true;
  }, 1500);
  
  setTimeout(() => {
    tamo.mood = "happy";
  }, 2500);
  
  drawAct4();
}

function drawAct4() {
  drawHutBackground();
  
  canvas.style.transform = 'none';
  
  popcorns.forEach(popcorn => {
    popcorn.update();
    popcorn.draw();
  });
  
  tamo.draw();
  
  if (frame === 150) {
    const specialPopcorn = new Popcorn(canvas.width / 2, canvas.height / 2);
    specialPopcorn.vx = (tamo.x - specialPopcorn.x) * 0.1;
    specialPopcorn.vy = (tamo.y - 50 - specialPopcorn.y) * 0.1;
    popcorns.push(specialPopcorn);
  }
  
  if (frame < 80) {
    drawText("The chaos settles..", 100, frame / 80, 32, "255, 255, 255");
  } else if (frame < 160) {
    drawText("A piece of the mysterious white fluff", 100, (frame - 80) / 80, 28, "255, 255, 255");
  } else if (frame < 240) {
    drawText("lands directly in Tamo's mouth!", 100, (frame - 160) / 80, 30, "255, 255, 0");
  } else if (frame < 320) {
    drawText("Tamo: 'Mmm.... *crunch crunch*'", 100, (frame - 240) / 80, 28, "255, 255, 0");
  } else if (frame < 400) {
    drawText("Tamo: 'This is... DELICIOUS!'", 100, (frame - 320) / 80, 32, "255, 255, 0");
  }
  
  frame++;
  
  if (frame === 400) {
    act = 5;
    frame = 0;
    setupAct5();
    return;
  }
  
  requestAnimationFrame(drawAct4);
}

function setupAct5() {
  tamo.mood = "happy";
  
  villagers.length = 0;
  for (let i = 0; i < 6; i++) {
    villagers.push(new Villager(100 + i * 120, canvas.height - 100));
  }

  tamo.x = canvas.width / 2;
  tamo.y = canvas.height - 100;
  
  drawAct5();
}

function drawAct5() {
  drawJungleBackground();
  
  villagers.forEach(villager => {
    villager.draw();
  });
  
  tamo.draw();
  
  popcorns.forEach(popcorn => {
    popcorn.vy = -Math.abs(popcorn.vy) * 0.1;
    popcorn.update();
    popcorn.draw();
  });

  if (frame % 20 === 0) {
    popcorns.push(new Popcorn(Math.random() * canvas.width, canvas.height + 20));
  }
  
  if (frame < 100) {
    drawText("Tamo calls the whole village!", 100, frame / 100, 36, "255, 215, 0");
  } else if (frame < 200) {
    drawText("Tamo: 'Try this amazing discovery!'", 100, (frame - 100) / 100, 30, "255, 255, 0");
  } else if (frame < 300) {
    drawText("Villagers: 'It's so crunchy and tasty!'", 100, (frame - 200) / 100, 28, "255, 255, 255");
  } else if (frame < 400) {
    drawText("And so, popcorn was born!", 100, (frame - 300) / 100, 32, "255, 215, 0");
  } else if (frame < 500) {
    drawText("From a happy accident in the jungle!", 100, (frame - 400) / 100, 30, "255, 255, 255");
  } else if (frame < 600) {
    drawText("🍿THE END ", 100, (frame - 500) / 100, 42, "255, 215, 0");
  }
  
  frame++;
  
  if (frame === 650) {
    act = 6;
    frame = 0;
    startCredits();
    return;
  }
  
  requestAnimationFrame(drawAct5);
}

function startCredits() {
  drawCredits();
}

function drawCredits() {
  const time = frame / 100;
  const r = Math.sin(time) * 50 + 100;
  const g = Math.sin(time + 2) * 50 + 100;
  const b = Math.sin(time + 4) * 50 + 100;
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const credits = [
    "🍿THE DAY THE CORN WENT BOOM!🍿",
    "",
    "A Jungle Adventure",
    "",
    "CAST",
    "",
    "Tamo - The Curious Explorer",
    "The Villagers - The Taste Testers",
    "The Corn Kernels - The Transformers",
    "",
    "PRODUCTION",
    "",
    "Story: An Accidental Discovery",
    "Animation: HTML5 Canvas Magic",
    "Inspiration: The Joy of Popcorn",
    "Created by: Stevens Antony and his brother",
    "",
    "MORAL OF THE STORY",
    "",
    "Sometimes the best discoveries",
    "happen completely by accident!",
    "",
    "From mysterious jungle seeds",
    "to the world's favorite snack,",
    "popcorn has been bringing",
    "joy for thousands of years!",
    "",
    "Fun Fact: The oldest popcorn",
    "was found in Peru and is over",
    "6,000 years old!",
    "",
    "Thank you for joining Tamo",
    "on his amazing discovery!",
    "",
    " ~ THE END ~ "
  ];
  
  ctx.font = "24px Comic Sans MS";
  ctx.textAlign = "center";
  
  const startY = canvas.height + 50;
  const scrollSpeed = 1.5;
  
  credits.forEach((line, index) => {
    const y = startY - (frame * scrollSpeed) + (index * 50);
    if (y > -50 && y < canvas.height + 50) {
      if (line.includes("🍿THE DAY THE CORN WENT BOOM!🍿")) {
        ctx.font = "42px Comic Sans MS";
        ctx.fillStyle = "gold";
      } else if (line.includes("🌟") || line.includes("🎬") || line.includes("🎉")) {
        ctx.font = "32px Comic Sans MS";
        ctx.fillStyle = "yellow";
      } else if (line.includes("~ THE END ~")) {
        ctx.font = "38px Comic Sans MS";
        ctx.fillStyle = "gold";
      } else {
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = "white";
      }
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeText(line, canvas.width / 2, y);
      ctx.fillText(line, canvas.width / 2, y);
    }
  });
  
  if (frame % 30 === 0) {
    popcorns.push(new Popcorn(Math.random() * canvas.width, canvas.height + 20));
  }
  
  popcorns.forEach(popcorn => {
    popcorn.vy = -Math.abs(popcorn.vy) * 0.2;
    popcorn.update();
    popcorn.draw();
  });
  
  frame++;
  
  if (frame > credits.length * 35 + 300) {
    frame = 0;
    popcorns.length = 0;
  }
  
  requestAnimationFrame(drawCredits);
}

function startAct1() {
  setupAct1();
  drawAct1();
}

startAct1();

let particles = [];
let colors = [];
const num = 1000;
const noiseScale = 0.01;
// const speed = .2;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
    // colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(0, 5);
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    stroke(255);
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n;
    p.x += cos(a); // * speed;
    p.y += sin(a); // * speed;
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

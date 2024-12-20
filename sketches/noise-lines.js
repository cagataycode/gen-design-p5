
let lines = [];

function setup() {
  createCanvas(2048, 2048);
  noLoop();
  
  for (let y = 0; y < 20; y++) {
    let line = [];
    for (let x = 0; x < 20; x++) {
      line.push([x / 19, y / 19]);
    }
    lines.push(line);
  }
}

function draw() {
  background(0);
  let margin = width * 0.1;

  stroke(255);
  strokeWeight(0.01 * width);
  noFill();

  lines.forEach(line => {
    beginShape();
    line.forEach(position => {
      let [u, v] = position;
      v += 0.1 * loopNoise(u, v, frameCount / 60);
      let x = lerp(margin, width - margin, u);
      let y = lerp(margin, width - margin, v);
      vertex(x, y);
    });
    endShape();
  });
}

function loopNoise(x, y, t, scale = 1) {
  let duration = scale;
  let current = t * scale;
  return (
    ((duration - current) * noise(x, y, current) +
      current * noise(x, y, current - duration)) /
    duration
  );
}

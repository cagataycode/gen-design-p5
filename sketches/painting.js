// You'll need to download nice-color-palettes.json
// or uncomment and use a smaller palette selection
// let palettes;
let grid = [];
const count = 40;
const fontFamily = "Andale Mono";
const characters = ["=", "."];

function preload() {
  // Uncomment and add path to your palettes JSON if using external palettes
  // palettes = loadJSON('path/to/nice-color-palettes.json');
}

function setup() {
  createCanvas(2048, 2048);

  // If not using external palettes, create a simple palette
  const palettes = [["#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970"]];

  const margin = width * 0.15;
  const maxColors = floor(random(2, 6));
  const palette = shuffle(random(palettes)).slice(0, maxColors);
  const frequency = random(0.75, 1.25);

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      let u = x / (count - 1);
      let v = y / (count - 1);

      // Simulate inside sphere distortion
      const dx = randomGaussian() * 0.05;
      const dy = randomGaussian() * 0.05;
      u += dx;
      v += dy;

      // Noise-based size and rotation
      const n = noise(u * frequency, v * frequency);
      const size = n * 0.5 + 0.5;
      const baseSize = width * 0.05;
      const sizeOffset = width * 0.05;

      grid.push({
        color: random(palette),
        size: abs(baseSize * size + randomGaussian() * sizeOffset),
        rotation: n * PI * 0.5,
        character: random(characters),
        position: [u, v],
      });
    }
  }

  // Optional: if you want a static image
  // noLoop();
}

function draw() {
  const margin = width * 0.15;
  const background = color(230, 230, 230);
  background(background);

  grid.forEach(({ position, rotation, size, color: gridColor, character }) => {
    const [u, v] = position;

    // Lerp-like interpolation
    const x = margin + u * (width - 2 * margin);
    const y = margin + v * (height - 2 * margin);

    push();
    translate(x, y);
    rotate(rotation);

    // Set color and text properties
    fill(gridColor);
    noStroke();
    textFont(fontFamily);
    textSize(size);
    textAlign(CENTER, CENTER);

    // Draw with slight transparency
    drawingContext.globalAlpha = 0.85;
    text(character, 0, 0);

    pop();
  });
}

// Optional interaction or animation
function mousePressed() {
  // Regenerate grid on click if you want
  redraw();
}

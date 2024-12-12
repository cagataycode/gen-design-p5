let points = [];
let font;
const count = 20;
const characters = ["←", "↑", "→", "↓", "A", "B"];
const background = "hsl(0, 0%, 96%)";
const palette = ["hsl(0, 0%, 10%)"];

function preload() {
  // Note: Replace with the actual path to your font file
  font = loadFont("SpaceGrotesk-Medium.woff");
}

function setup() {
  createCanvas(2048, 2048);

  // Create grid
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // Only add point with 50% chance
      if (random() < 0.5) {
        const u = x / (count - 1);
        const v = y / (count - 1);

        const character = random(characters);
        const r = /[AB]/i.test(character) ? 25 : 50;
        const e = /[AB]/i.test(character) ? 10 : 20;

        points.push({
          color: random(palette),
          radius: abs(r + e * randomGaussian()),
          position: [u, v],
          character: character,
        });
      }
    }
  }

  // Optional: Uncomment if you want to display once
  // noLoop();
}

function draw() {
  // Set background
  background(background);

  // Set font
  textFont(font);
  textAlign(CENTER, CENTER);

  // Calculate margin
  const margin = width * 0.175;

  // Draw points
  points.forEach((data) => {
    const { position, radius, color, character } = data;

    // Map position with lerp-like interpolation
    const x = margin + position[0] * (width - 2 * margin);
    const y = margin + position[1] * (height - 2 * margin);

    // Draw character
    fill(color);
    textSize(radius);
    text(character, x, y);
  });
}

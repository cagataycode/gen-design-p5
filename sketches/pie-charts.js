let points = [];
let background;
let count;

function setup() {
  // Create canvas with similar proportions to original
  createCanvas(2048, 2048);

  // Mimic original randomization
  const palettes = [
    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
    ["#023E8A", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
    ["#6A4C93", "#8AC926", "#FFCA3A", "#FF924C", "#FF124F"],
  ];

  // Pick a random palette
  const palette = shuffle(random(palettes));
  background = palette.shift();

  // Random grid count
  count = floor(random(4, 10));

  // Create grid
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);

      // Corners: 0 (right), 0.5 (top), 1 (left), 1.5 (bottom)
      const corner = random([0, 0.5, 1, 1.5]);
      const arcStart = PI * corner;
      const arcEnd = arcStart + PI * 1.5;

      points.push({
        position: [u, v],
        arcStart,
        arcEnd,
      });
    }
  }

  // Optional: make it static
  // noLoop();
}

function draw() {
  // Set background
  background(background);

  // Draw points
  points.forEach((point) => {
    const { position, arcStart, arcEnd } = point;

    const [u, v] = position;
    const margin = width * 0.2;

    // Interpolate position
    const x = margin + u * (width - 2 * margin);
    const y = margin + v * (height - 2 * margin);

    // Calculate radius
    const dim = min(width, height) - margin * 2;
    const radius = (dim / (count - 1)) * 0.35;

    // Draw arc
    push();
    fill(0); // Black fill
    noStroke();
    beginShape();
    arc(x, y, radius * 2, radius * 2, arcStart, arcEnd);
    vertex(x, y);
    endShape(CLOSE);
    pop();
  });
}

// Optional: regenerate on mouse press
function mousePressed() {
  redraw();
}

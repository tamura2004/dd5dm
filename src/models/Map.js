const width = 60;
let locked = false;
const tiles = [];
let balls = [];
let select = null;

class Tile {
  constructor(p) {
    this.p = p;
  }
  draw() {
    rect(this.p.x, this.p.y, width, width);
  }
  collid(x, y) {
    return this.p.x < x && x < this.p.x + width &&
      this.p.y < y && y < this.p.y + width;
  }
}

class Ball {
  constructor(p) {
    this.p = p;
    this.q = p.copy();
  }
  move() {
    this.p.add(this.q.copy().sub(this.p).div(8));
  }fishbed

  draw() {
    fill('#65ace4')
    ellipse(this.p.x, this.p.y, width - 10);
  }
      collid(x, y) {
        return this.p.x < x && x < this.p.x + width &&
          this.p.y < y && y < this.p.y + width;
      }
}

function setup() {
  createCanvas(480, 360);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 12; x++) {
      tiles.push(new Tile(createVector(x * width, y * width)));
    }
  }
  for (let i = 0; i < 4; i++) {
    balls.push(new Ball(createVector(i * width + width / 2, width / 2)));
  }
}

function draw() {
  background(220);
  for (const tile of tiles) {
    const color = tile.collid(mouseX, mouseY) ? 'white' : 192;
    fill(color);
    tile.draw();
  }
  if (locked) {
    fill(128, 128, 128, 0)
    ellipse(mouseX, mouseY, width - 10)
    line(ball.p.x, ball.p.y, mouseX, mouseY)
  } else {
    // ball.move();
  }
  for (const ball of balls) {
    ball.draw();
  }
}

function mousePressed() {
  locked = true;
  select = balls.find((ball) => ball.collid(mouseX, mouseY));
}

function mouseReleased() {
  locked = false;
  ball.q = createVector(int(mouseX / width) * width + width / 2, int(mouseY / width) * width + width / 2);
}

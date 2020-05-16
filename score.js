let asteroidTotal;

function addScore(points, x, y) {
  points = round(points);
  asteroidTotal += points;
  if (x && y) {
    let clr = color(255, points > 0 ? 120 : 0, 0);
    overlay.push(new Message(x, y, points, clr));
  }
}

function displayScore(){
  push();
  fill(0, 200);
  stroke(242, 46, 242, 100);
  rect(10, 10, 170, 70);
  noStroke();
  fill(200);
  textSize(15);
  text(`Level: ${level}`, 20, 30);
  text(`Score: ${asteroidTotal}`, 20, 50);
  text(`Bolide speed: ${100 * astSpeed / 2}%`, 20, 70);

  pop()
}

function displayMap() {
  push();
  translate(10, height - 10);

  // everything is scaled by same ratio, even strokeWeight
  const mapScale = 10;
  scale(1 / mapScale);
  strokeWeight(1 * mapScale);
  translate(0, -playHeight)

  // outline
  fill(0, 200);
  stroke(242, 46, 242, 100);
  rect(0, 0, playWidth, playHeight);

  strokeWeight(3 * mapScale);
  for (const target of targets) {
    // asteroids are white
    if (target instanceof Asteroid) stroke(255);
    // bonuses are blue
    else stroke(0, 0, 255);
    // point() accepts a vector and all Hadrons are vectors
    point(target);
  }
  // enemies are red
  stroke(255, 0, 0);
  for (const foe of enemy) point(foe);
  // friendlies are green
  stroke(0, 255, 0);
  for (const friend of friendly) point(friend);
  pop();
}

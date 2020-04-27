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

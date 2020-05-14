class Start
{
  update() {
    if (keyIsDown(SPACE)) {
      game = new Game();
    }
  }

  draw() {
    push();
    fill(0);
    stroke(map(shade, -1, 1, 100, 200));
    strokeWeight(200);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('press space to begin', width / 2, height / 2);
    pop();
  }
}

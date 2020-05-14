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
    stroke(200);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('press space to begin', width / 2, height / 2);
    pop();
  }
}

class Ending {
  constructor(score, ...targets) {
    this.score = score;
    this.targets = new Set(targets);
  }

  update() {
    for (const target of this.targets) target.update();
  }

  draw() {
    for (const target of this.targets) target.draw();
    this.score.draw();

    push();
    fill(0);
    stroke(200);
    strokeWeight(3);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('game over :(', width / 2, height / 2);
    pop();
  }
}

class Score {
  constructor() {
    this.total = 0;
  }

  add(points, x, y) {
    points = round(points);
    this.total += points;
    if (x && y) {
      let clr = color(255, points > 0 ? 120 : 0, 0);
      overlay.push(new Message(x, y, points, clr));
    }
  }

  draw(){
    push();
    fill(0, 200);
    stroke(242, 46, 242, 100);
    rect(10, 10, 170, 70);
    noStroke();
    fill(200);
    textSize(15);
    text(`Level: ${this.level}`, 20, 30);
    text(`Score: ${this.total}`, 20, 50);
    text(`Bolide speed: ${100 * this.speed / 2}%`, 20, 70);
    pop()
  }
}

class Message extends p5.Vector {
  constructor(x, y, msg, clr) {
    super(randomGaussian(x, 5), randomGaussian(y, 5));
    this.msg = msg;
    this.ttl = 120;
    this.fill = clr;
    this.stroke = color(0);
  }

  update() {
    this.ttl--;
    if (this.ttl <= 0) {
      let i = overlay.indexOf(this);
      overlay.splice(i, 1);
    }
    let alpha = map(this.ttl, 120, 50, 255, 0);
    this.fill.setAlpha(alpha);
    this.stroke.setAlpha(alpha);
  }

  draw() {
    push();
    textSize(15);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    fill(this.fill);
    stroke(this.stroke);
    strokeWeight(1.5);
    text(this.msg, this.x, this.y);
    pop();
  }
}
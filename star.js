class Star extends Hadron {
  constructor() {
    super(
      random(playWidth),
      random(playHeight),
      random(0.1, 3),
      createVector(0.2, random(-0.3))
    );
    this.clr = color(200, 200, random(100, 255), random(250, 255));
  }

  render() {
    stroke(this.clr);
    strokeWeight(this.radius);
    point(0, 0);
  }

}

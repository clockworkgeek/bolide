// A physical object with momentum constrained by canvas size

class Hadron extends p5.Vector {
  constructor(x, y, radius, velocity) {
    super(x, y);
    this.radius = radius;
    this.velocity = velocity || createVector(0, 0);
  }

  // generate 9 possible views of an object in 2D toroidal space
  // between 1 and 4 will be visible at any time
  *locations() {
    const {x, y} = this;

    // main image
    yield [x, y];

    // near edges
    yield [x + width, y];
    yield [x, y + height];
    yield [x - width, y];
    yield [x, y - height];

    // near corners
    yield [x + width, y + height];
    yield [x - width, y - height];
    yield [x + width, y - height];
    yield [x - width, y + height];
  }

  // true if these two hadron objects intersect
  collide(object) {
    for (const [x, y] of this.locations()) {
      let disp = dist(x, y, object.x, object.y);
      let overlap = this.radius + object.radius - disp;
      if (overlap > 0) {
        // push force is a fraction of the overlap so that objects have several frames to do damage to each other
        // also too much force is elastic
        let push = object.copy().sub(x, y).setMag(overlap / 10);
        object.velocity.add(push);
        push.mult(-1); // equal and opposite reaction
        this.velocity.add(push);
        return true;
      }
    }
    return false;
  }

  // like Array.filter but returns a generator instead of another array
  *collider(objects) {
    for (const object of objects) {
      if (this.collide(object)) {
        yield object;
      }
    }
  }

  // called once per frame to move self, respond to inputs
  update() {
    this.add(this.velocity);
    // loop around edges
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }

  // draw will call render() as necessary
  draw() {
    const r = this.radius;
    for (const [x, y] of this.locations()) {
      if (x > -r && y > -r && x < width + r && y < height + r) {
        push();
        translate(x, y);
        this.render();
        pop();
      }
    }
  }

  // override for actual drawing
  render() {
    // print("Do not call Hadron.render directly");
  }

  // used for debugging
  toString() {
    return `Hadron Object {x:${this.x}, y:${this.y}, r:${this.radius}, v:[${this.velocity.x},${this.velocity.y}]}`;
  }
}

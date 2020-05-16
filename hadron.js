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
        // also too much force would be elastic and big objects would move too much
        let push1 = object.copy().sub(x, y).setMag(overlap / object.radius);
        let push2 = createVector(x, y).sub(object).setMag(overlap / this.radius);
        object.velocity.add(push1);
        this.velocity.add(push2);
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

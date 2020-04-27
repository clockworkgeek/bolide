class Star {
  constructor(){
    this.vel = createVector(0.2, random(-0.3));    
    this.r = random(0.1, 3);
    this.clr = color(200, 200, random(100, 255), random(250, 255));
    this.pos = createVector(random(width), random(height));
    
  }

  render(){  
    push();
    stroke(this.clr); 
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);   
    pop();
  }
  
  update(){
    this.pos.add(this.vel);
  }
  
  
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  
}
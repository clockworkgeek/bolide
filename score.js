var asteroidTotal = 0; 
var podTotal = 0; 
var astPointDisplay = false; 

function displayScore(){
  push();
  fill(0, 200);
  stroke(242, 46, 242, 100);
  rect(10, 10, 170, 70);
  noStroke();
  fill(200);
  textSize(15);
  text("Level: " + level, 20, 30);
  text("Score: " + asteroidTotal, 20, 50);
  text("Bolide speed (+/-): " + astSpeed, 20, 70);

  pop()
}


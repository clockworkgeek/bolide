// if ship is original size, give distinct color. 

// INNA: restart button

// NICO suggests at level 4 introduce a ship that shoots at you. (LOOSH SAYS LEVEL 5) DAD SAYS 2!!!!!

// INNA suggests being able to "change your icon"
// LOOSH say "yeah there should be a little button you hit before you start the game to choose your ship. 
// OR I was thinking ship would "auto-generate" every time you play 

// after level 10, the stars get big and hard to tell apart from the asteroids. 

// add a floating object that when you shoot it, it creates a "clone" of your ship. 

// limit number of bullets per level. Only if ship lands on refilling satellites can the bullets be replenished. 

// score board tracks weird object collection count. 

// display point value when asteroids are hit. 

// when "special" asteroids collide, they combine into larger asteroids

// add frame drift when ship gets to % of frame. track position and speed in space based on frame of reference. 

// add map insert to track position 

// track high scores

// create a "true" clone where second ship is controlled by holding down shift key.

var ship;
var asteroids = [];
var startingAstCount = 5;
var level = 1;
var startingShipSize = 12;
var astSpeed = 2;
var minAstSize = 15;

var floaters = [];
var lasers = [];
var stars = [];

var globalVolume = 0.1;
var sShoot;
var sHit;
var sDead;

function preload() {
  // preload() runs once
  sShoot = loadSound('assets/hint.wav');
  sHit = loadSound('assets/jump.wav');
  sDead = loadSound('assets/spurs_clink.mp3');
  sRestorer = loadSound('assets/hint.wav');
}

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);

  ship = new Ship();
  for (var i = 0; i < startingAstCount; i++) {
    asteroids.push(new Asteroid());
  }

  for (var j = 0; j < 1; j++) {
    floaters.push(new Floater(1));
  }

  for (var k = 0; k < 100; k++) {
    stars.push(new Star());
  }

}

function draw() {
  background(0);

  for (let i = 0; i < stars.length; i++) {
    stars[i].render();
    stars[i].update();
    stars[i].edges();
  }

  if (asteroids.length == 0) {
    asteroidTotal += startingAstCount * 100;
    startingAstCount++;
    level++;
    astSpeed++;
    for (var i = 0; i < startingAstCount; i++) {
      asteroids.push(new Asteroid());
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i]) && !ship.fireShieldOn) {
      ship.r += 0.1;
      ship.clr += 0.5;
      sDead.play();
      sDead.setVolume(globalVolume / 5);
    }
    if (ship.hits(asteroids[i]) && ship.fireShieldOn) {
      if (asteroids[i].r > minAstSize) {
        let newAsteroids = asteroids[i].breakup();
        asteroids = asteroids.concat(newAsteroids);
        sHit.play();
        sHit.setVolume(globalVolume / 2);
      }
      asteroids.splice(i, 1);
      break;
    }

    if (ship.r > 50) {
      textSize(30);
      fill(255);
      text("game over :(", width / 2, 40);
      noLoop();
    }

    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();

    // asteroids[i].displayPoints();
  }

  for (let i = 0; i < floaters.length; i++) {
    if (ship.floaterConnect(floaters[i])) {
      switch (floaters[i].type) {
        case 'shrink':
          if (ship.r >= startingShipSize) {
            ship.fireShieldOn = 0;
            ship.r -= 2;
            ship.clr = 0;
            asteroidTotal -= 5;
            sRestorer.play();
            sRestorer.setVolume(globalVolume);
          }
          if (ship.r < startingShipSize) {
            floaters.splice(i, 1);
            floaters.push(new Floater(1));
          }
          break;
        case 'fireRing':
          ship.fireShieldOn = 600; //ttl
          ship.r -= 2;
          ship.clr = 0;
          asteroidTotal -= 5;
          sRestorer.play();
          sRestorer.setVolume(globalVolume);
          floaters.splice(i, 1);
          floaters.push(new Floater(0));
          break;
      }
    }
    floaters[i].render();
    floaters[i].update();
    floaters[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          asteroids[j].pointDisplay = true;
          sHit.play();
          sHit.setVolume(globalVolume);

          if (asteroids[j].r > minAstSize) {

            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
        
      }

    }

  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
for (var k = floaters.length - 1; k >= 0; k--) {
        if (lasers[i].hits(floaters[k])) {
          sRestorer.play();
          sRestorer.setVolume(globalVolume);

          switch (floaters[k].type) {
            case 'shrink':
              if (ship.r >= startingShipSize) {
                ship.fireShieldOn = 0;
                ship.r -= 2;
                ship.clr = 0;
                asteroidTotal -= 5;
                sRestorer.play();
                sRestorer.setVolume(globalVolume);
              }
              if (ship.r < startingShipSize) {
                floaters.splice(k, 1);
                floaters.push(new Floater(1));
              }
              break;
            case 'fireRing':
              ship.fireShieldOn = 600; //ttl
              ship.r -= 2;
              ship.clr = 0;
              asteroidTotal -= 5;
              sRestorer.play();
              sRestorer.setVolume(globalVolume);
              floaters.splice(k, 1);
              floaters.push(new Floater(0));
              break;
          }

          lasers.splice(i, 1);
          break;
        }
      }

    }

  }
  
  
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  displayScore();

  // try instead of using a boolean
  // use a value and decrement 

  if (ship.fireShieldOn) {
    ship.fireShieldOn--;
  }

}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
  ship.reversing(false);
  ship.thrustAlpha = 0;
}

function keyPressed() {
  if (key == ' ') {
    sShoot.play();
    sShoot.setVolume(globalVolume);
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode == DOWN_ARROW) {
    ship.reversing(true);
  }
}
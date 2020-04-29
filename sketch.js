// if ship is original size, give distinct color.

// INNA: restart button ..

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

// two player mode where each player has their own score and cannot hurt each other, or no scores kept and winner is last one alive

let ship;
let numTargets;
let startingAstCount;
let level;
let astSpeed;

let targets = [];
let friendly = [];
let enemy = [];
let stars = [];
let overlay = [];

let sShoot;
let sHit;
let sDead;
let sRestorer;
let sFizzle;
let sCharm;

const startingShipSize = 12;
const maxShipSize = 50;
const startingVolume = 0.1;
const minAstSize = 15;
const SPACE = 32;
const charmBatchSize = 10;

function preload() {
  // preload() runs once
  sShoot = loadSound('assets/hint.wav');
  sHit = loadSound('assets/jump.wav');
  sDead = loadSound('assets/spurs_clink.mp3');
  sRestorer = loadSound('assets/hint.wav');
  sFizzle = loadSound('assets/fizzle.mp3');
  sCharm = loadSound('assets/water_drop.wav');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor('none');

  masterVolume(startingVolume);
  sDead.setVolume(1 / 5);

  ship = new Ship();
  targets = [];
  targets.push(new Ring());
  numTargets = 0;
  startingAstCount = 10;
  asteroidTotal = 0;
  friendly = [ship];
  enemy = [];
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
  overlay = [];
  level = 0;
  newLevel();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newLevel() {
  if (level !== 0) {
    addScore(startingAstCount * 100);
  }
  startingAstCount++;
  astSpeed = level * 0.5 + 2;
  level++;

  for (let i = 0; i < startingAstCount; i++) {
    targets.push(new Asteroid());
  }
  for (let i = 0; i < charmBatchSize; i++) {
    targets.push(new Charm());
  }

  ship.fireShieldOn += 100;
  enemy.push(new Attacker());
}

function endGame() {
  textSize(30);
  fill(255);
  text("game over :(", width / 2, 40);
  noLoop();
}

// it is good practice to update all elements before drawing them
function updateAll() {

  for (const star of stars) star.update();

  for (const target of targets) target.update();

  for (const friend of friendly) {
    friend.update();

    for (const target of friend.collider(targets)) {
      // green and red floating dots
      if (target instanceof Asteroid) {
        if (friend instanceof Ship && !friend.fireShieldOn) {
          friend.hit();
        } else {
          target.breakup();
        }
      } else if (target instanceof Heal) {
        target.heal(ship);
      } else if (target instanceof Ring) {
        target.protect(ship);
      } else if (target instanceof Charm) {
        target.score(ship);
      }

      if (friend instanceof Laser) friend.remove();
    }
    // flattening an array merges debris with the rest of rocks
    targets = targets.flat();
  }

  for (const foe of enemy) {
    foe.update();

    for (const friend of foe.collider(friendly)) {
      if (friend instanceof Laser && foe instanceof Attacker) {
        foe.hit();
        friend.remove();
      } else if (friend instanceof Ship) {
        if (!friend.fireShieldOn) friend.hit(foe);
        if (foe instanceof Laser) foe.remove();
      }
    }
  }

  for (const effect of overlay) effect.update();

  if (numTargets == 0) newLevel();

}

function draw() {

  // pause if not the focus and cannot receive key presses
  if (focused) updateAll();

  background(0);

  for (const star of stars) star.draw();
  for (const target of targets) target.draw();
  for (const foe of enemy) foe.draw();
  for (const friend of friendly) friend.draw();
  displayScore();
  for (const effect of overlay) effect.draw();

  if (ship.radius > maxShipSize) endGame();

}

function keyPressed() {
  // R to reset
  if (keyCode == 82) {
    setup();
  }
}

// core mechanics inherited from Coding Train / Daniel Shiffman's
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_046_Asteroids/P5
// Initial updates by Chris Amato, https://github.com/knectardev
// Proper OOP methods and substantial refactoring by Daniel Deady, https://github.com/clockworkgeek

let ship;
let numTargets;
let startingAstCount;
let level;
let astSpeed;
let playWidth, playHeight;
let viewLeft, viewTop;

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
  playWidth = displayWidth;
  playHeight = displayHeight;
  viewLeft = 0;
  viewTop = 0;

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
        target.remove();
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

  // max(…, 0) is never less than zero
  let panLeft  = max(viewLeft + width * 1/4 - ship.x, 0);
  let panRight = max(ship.x - viewLeft - width * 3/4, 0);
  let panUp    = max(viewTop + height * 1/4 - ship.y, 0);
  let panDown  = max(ship.y - viewTop - height  * 3/4, 0);
  viewLeft = constrain(viewLeft - panLeft / 10 + panRight / 10, 0, playWidth - width);
  viewTop  = constrain(viewTop - panUp / 10 + panDown / 10, 0, playHeight - height);
}

function draw() {

  // pause if not the focus and cannot receive key presses
  if (focused) updateAll();

  background(0);

  push();
  translate(-viewLeft, -viewTop);
  for (const star of stars) star.draw();
  for (const target of targets) target.draw();
  for (const foe of enemy) foe.draw();
  for (const friend of friendly) friend.draw();
  for (const effect of overlay) effect.draw();
  pop();

  // don't translate score position since it is not relative to playing space
  displayScore();
  displayMap();

  if (ship.radius > maxShipSize) endGame();

}

function keyPressed() {
  // R to reset
  if (keyCode == 82) {
    setup();
  }
}

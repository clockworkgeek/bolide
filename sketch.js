// core mechanics inherited from Coding Train / Daniel Shiffman's
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_046_Asteroids/P5
// Initial updates by Chris Amato, https://github.com/knectardev
// Proper OOP methods and substantial refactoring by Daniel Deady, https://github.com/clockworkgeek

let game;
let stars = [];
let overlay = [];

let sShoot;
let sHit;
let sDead;
let sRestorer;
let sFizzle;
let sCharm;

const startingAstCount = 10;
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

  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  game = new Start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// it is good practice to update all elements before drawing them
function updateAll() {

  for (const star of stars) star.update();

  game.update();

  for (const effect of overlay) effect.update();

}

function draw() {

  // pause if not the focus and cannot receive key presses
  if (focused) updateAll();

  background(0);

  for (const star of stars) star.draw();
  game.draw();
  for (const effect of overlay) effect.draw();

}

function keyPressed() {
  // R to reset
  if (keyCode == 82) {
    asteroidTotal = 0;
    game = new Start();
  }
}

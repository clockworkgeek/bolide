class Game
{
  constructor(level = 1, ship = new Ship(), score = new Score()) {
    this.level = level;
    this.astSpeed = level * 0.5 + 1.5;
    this.score = score;
    this.ship = ship;
    ship.fireShieldOn += 100;
    this.friendly = new Set();
    this.friendly.add(ship);

    this.numTargets = 0;
    this.enemy = new Set();
    this.addEnemy(new Attacker(this.astSpeed));

    let initialAsteroids = startingAstCount + level;
    this.targets = new Set();
    this.targets.add(new Ring());
    for (let i = 0; i < initialAsteroids; i++) {
      this.addTarget(new Asteroid());
    }
    for (let i = 0; i < charmBatchSize; i++) {
      this.targets.add(new Charm());
    }
  }

  addEnemy(foe) {
    this.enemy.add(foe);
    this.numTargets++;
  }

  removeEnemy(foe) {
    if (this.enemy.delete(foe)) {
      this.numTargets--;
    }
  }

  addFriend(friend) {
    this.friendly.add(friend);
  }

  removeFriend(friend) {
    this.friendly.delete(friend);
  }

  addTarget(target) {
    this.targets.add(target);
    this.numTargets++;
  }

  removeTarget(target) {
    if (this.targets.delete(target)) {
      this.numTargets--;
    }
  }

  update() {
    for (const target of this.targets) target.update();

    for (const friend of this.friendly) {
      friend.update();

      for (const target of friend.collider(this.targets)) {
        // green and red floating dots
        if (target instanceof Asteroid) {
          if (friend instanceof Ship && !friend.fireShieldOn) {
            friend.hit();
          } else {
            target.breakup();
          }
        } else if (target instanceof Heal) {
          target.heal(this.ship);
        } else if (target instanceof Ring) {
          target.protect(this.ship);
        } else if (target instanceof Charm) {
          target.score(this.ship);
          this.targets.delete(target);
        }

        if (friend instanceof Laser) friend.remove();
      }
    }

    for (const foe of this.enemy) {
      foe.update();

      for (const friend of foe.collider(this.friendly)) {
        if (friend instanceof Laser && foe instanceof Attacker) {
          foe.hit();
          friend.remove();
        } else if (friend instanceof Ship) {
          if (!friend.fireShieldOn) friend.hit(foe);
          if (foe instanceof Laser) foe.remove();
        }
      }
    }

    if (this.numTargets <= 0) {
      // start next level with ship in same place, condition
      game = new Game(this.level + 1, this.ship, this.score);
    }
  }

  draw() {
    for (const target of this.targets) target.draw();
    for (const foe of this.enemy) foe.draw();
    for (const friend of this.friendly) friend.draw();
    this.score.draw(this.level, this.astSpeed);

    if (this.ship.radius > maxShipSize) this.end();
  }

  end() {
    textSize(30);
    fill(255);
    text("game over :(", width / 2, 40);
    noLoop();
  }
}

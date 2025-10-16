import Config from './config.js';

class FteenCleaner {
  constructor(Lx, Ly, direction, x, y) {
    this.Lx = Lx;
    this.Ly = Ly;
    this.direction = direction;
    this.x = x;
    this.y = y;
  }

  setInitialPosition(direction, x, y) {
    this.direction = direction;
    this.x = x;
    this.y = y;
  }

  isValidPosition(x, y) {
    return x >= 0 && x <= this.Lx && y >= 0 && y <= this.Ly;
  }

  moveForward() {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case Config.directions.NORTH:
        newY += 1;
        break;
      case Config.directions.EAST:
        newX += 1;
        break;
      case Config.directions.SOUTH:
        newY -= 1;
        break;
      case Config.directions.WEST:
        newX -= 1;
        break;
    }

    if (!this.isValidPosition(newX, newY)) {
      throw new Error(`Movement out of bounds : (${newX}, ${newY})`);
    }

    this.x = newX;
    this.y = newY;
  }

  turnLeft() {
    this.direction = Config.turns.left[this.direction];
  }

  turnRight() {
    this.direction = Config.turns.right[this.direction];
  }

  executeCommands(commands) {
    for (const cmd of commands) {
      switch (cmd) {
        case Config.commands.MOVE_FORWARD:
          this.moveForward();
          break;
        case Config.commands.TURN_LEFT:
          this.turnLeft();
          break;
        case Config.commands.TURN_RIGHT:
          this.turnRight();
          break;
      }
    }
  }

  getStatus() {
    return `${this.direction} ${this.x} ${this.y}`;
  }
}

export default FteenCleaner;

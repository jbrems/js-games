export default class Controls {
  direction = 'DOWN';
  isMoving = false;

  constructor() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  static getInstance() {
    if (!this.instance) this.instance = new Controls();
    return this.instance;
  }

  onKeyDown(event) {
    this.setDirection(event.key);
    if (this.getDirection(event.key)) this.isMoving = true;
  }

  onKeyUp(event) {
    if (this.getDirection(event.key) === this.direction) this.isMoving = false;
  }

  setDirection(key) {
    const newDirection = this.getDirection(key);   

    if (this.direction && this.direction !== newDirection) this.direction = newDirection;

    return newDirection;
  }

  getDirection(key) {
    if (key === 'ArrowUp' || key === 'z') return 'UP';
    if (key === 'ArrowRight' || key === 'd') return 'RIGHT';
    if (key === 'ArrowDown' || key === 's') return 'DOWN';
    if (key === 'ArrowLeft' || key === 'q') return 'LEFT';
  }

  get isFacingUp() {
    return this.direction === 'UP';
  }

  get isFacingRight() {
    return this.direction === 'RIGHT';
  }

  get isFacingDown() {
    return this.direction === 'DOWN';
  }

  get isFacingLeft() {
    return this.direction === 'LEFT';
  }
}
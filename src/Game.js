import Sprite from './Sprite';
import Controls from './Controls';
import WorldGenerator from './WorldGenerator';

export default class Game {
  gameLoop;
  tickCount = 0;
  frameCount = 0;

  constructor(canvas, width, height) {
    this.canvas = canvas;
    canvas.width = width;
    canvas.height = height;
    this.width = width;
    this.height = height;

    this.controls = Controls.getInstance();
  }

  async init() {
    await this.loadSprites();
    this.world = WorldGenerator.get(0, 0, 15, 10);
  }

  async loadSprites() {
    this.dudeUp = await Sprite.load('/assets/ACharUp.png', { step0:[0, 0, 24, 24], step1: [24, 0, 24, 24], step2: [0, 24, 24, 24], step3: [24, 24, 24, 24] }, { animationLength: 8 });
    this.dudeRight = await Sprite.load('/assets/ACharRight.png', { step0:[0, 0, 24, 24], step1: [24, 0, 24, 24], step2: [0, 24, 24, 24], step3: [24, 24, 24, 24] }, { animationLength: 8 });
    this.dudeDown = await Sprite.load('/assets/ACharDown.png', { step0:[0, 0, 24, 24], step1: [24, 0, 24, 24], step2: [0, 24, 24, 24], step3: [24, 24, 24, 24] }, { animationLength: 8 });
    this.dudeLeft = await Sprite.load('/assets/ACharLeft.png', { step0:[0, 0, 24, 24], step1: [24, 0, 24, 24], step2: [0, 24, 24, 24], step3: [24, 24, 24, 24] }, { animationLength: 8 });
    this.worldSprites = await Sprite.load('/assets/world.png', { 
      grassLightToGrassDarkTopLeft: [216, 12, 12, 12],
      grassLightToGrassDarkTop: [228, 12, 12, 12],
      grassLightToGrassDarkTopRight: [240, 12, 12, 12],
      grassLightToGrassDarkLeft: [216, 24, 12, 12],
      grassLightCenter: [228, 24, 12, 12],
      grassLightToGrassDarkRight: [240, 24, 12, 12],
      grassLightToGrassDarkBottomLeft: [216, 36, 12, 12],
      grassLightToGrassDarkBottom: [228, 36, 12, 12],
      grassLightToGrassDarkBottomRight: [240, 36, 12, 12],
      grassLightToSandTopLeft: [216, 60, 12, 12],
      grassLightToSandTop: [228, 60, 12, 12],
      grassLightToSandTopRight: [240, 60, 12, 12],
      grassLightToSandLeft: [216, 72, 12, 12],
      // grassLightCenter: [228, 72, 12, 12],
      grassLightToSandRight: [240, 72, 12, 12],
      grassLightToSandBottomLeft: [216, 84, 12, 12],
      grassLightToSandBottom: [228, 84, 12, 12],
      grassLightToSandBottomRight: [240, 84, 12, 12],
      sand1: [216, 156, 12, 12],
      sand2: [228, 156, 12, 12],
      sand3: [240, 156, 12, 12],
      sand4: [216, 168, 12, 12],
      sand5: [228, 168, 12, 12],
      sand6: [240, 168, 12, 12],
      sand7: [216, 180, 12, 12],
      sand8: [228, 180, 12, 12],
      sand9: [240, 180, 12, 12],
     });
  }

  get ctx() {
    return this.canvas.getContext('2d');
  }

  startGameLoop() {
    return setInterval(this.tick.bind(this), 16.66);
  }

  start() {
    this.gameLoop = this.startGameLoop();
    requestAnimationFrame(this.render.bind(this));
  }

  pause() {
    clearInterval(this.gameLoop);
  }

  resume() {
    this.gameLoop = this.startGameLoop();
  }

  tick() {
    this.tickCount += 1;
  }

  render() {
    this.frameCount++;
    this.ctx.clearRect(0, 0, 800, 600);
    this.renderWorld();
    this.renderDude();
    // this.renderGrid();
    this.renderFrameCount();
    requestAnimationFrame(this.render.bind(this));
  }

  renderFrameCount() {
    this.ctx.fillText('Tick     ' + this.tickCount, 5, 12);
    this.ctx.fillText('Frame ' + this.frameCount, 5, 24);
  }

  renderDude() {
    let dude = this.dudeDown;
    if (this.controls.isFacingUp) dude = this.dudeUp;
    if (this.controls.isFacingRight) dude = this.dudeRight;
    if (this.controls.isFacingLeft) dude = this.dudeLeft;

    const dudeImg = this.controls.isMoving ? dude.getAnimationFrame(this.frameCount) : dude.getIdleFrame();

    this.ctx.strokeRect(this.width/2 - 6, this.height/2 - 6, 12, 12);
    this.ctx.drawImage(dudeImg, this.width/2 - 12, this.height/2 - 18);
  }

  renderFlatWorld() {
    this.ctx.drawImage(this.worldSprites.grassLightToSandTopLeft, 0, 0);
    for (let c = 1; c <= this.width/12 - 2; c++) {
      this.ctx.drawImage(this.worldSprites.grassLightToSandTop, c * 12, 0);
    }
    this.ctx.drawImage(this.worldSprites.grassLightToSandTopRight, this.width - 12, 0);

    for (let r = 1; r <= this.height/12 - 2; r++) {
      this.ctx.drawImage(this.worldSprites.grassLightToSandLeft, 0, r * 12);
      for (let c = 1; c <= this.width/12 - 2; c++) {
        this.ctx.drawImage(this.worldSprites.grassLightCenter, c * 12, r * 12);
      }
      this.ctx.drawImage(this.worldSprites.grassLightToSandRight, this.width - 12, r * 12);
    }

    this.ctx.drawImage(this.worldSprites.grassLightToSandBottomLeft, 0, this.height - 12);
    for (let c = 1; c <= this.width/12 - 2; c++) {
      this.ctx.drawImage(this.worldSprites.grassLightToSandBottom, c * 12, this.height - 12);
    }
    this.ctx.drawImage(this.worldSprites.grassLightToSandBottomRight, this.width - 12, this.height - 12);
  }
  
  renderWorld() {
    if (!this.world) return;

    const tileWidth = this.width / this.world[0].length;
    const tileHeight = this.height / this.world.length;

    for (let r = 0; r < this.world.length; r++) {
      for (let c = 0; c < this.world[r].length; c++) {
        if (this.world[r][c][0]) this.ctx.drawImage(this.worldSprites[this.world[r][c][0]], c * tileWidth, r * tileHeight, tileWidth, tileHeight);
      }
    }
  }

  renderGrid() {
    this.ctx.strokeStyle = 'white';
    for (let r = 0; r <= this.height/12; r++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, r * 12);
      this.ctx.lineTo(this.width, r * 12);
      this.ctx.stroke();
    }
    for (let c = 0; c <= this.width/12; c++) {
      this.ctx.beginPath();
      this.ctx.moveTo(c * 12, 0);
      this.ctx.lineTo(c * 12, this.height);
      this.ctx.stroke();
    }
  }
}
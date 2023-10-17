export default class Sprite {
  static async load(source, sprites, { animationLength = 0 } = {}) {
    const sprite = new Sprite();
    sprite.image = new Image();
    sprite.image.src = source;

    sprite.animationLength = animationLength;
    if (animationLength) sprite.animationFrames = [];

    await new Promise((resolve) => {
      sprite.image.onload = sprite.cutSprites.bind(sprite, sprites, resolve);
    });

    return sprite;
  }

  async cutSprites(sprites, resolve) {
    this.loaded = true;
    for (let key of Object.keys(sprites)) {
      this[key] = await createImageBitmap(this.image, ...sprites[key]);
      if (this.animationLength) this.animationFrames.push(this[key]);
    }
    resolve();
  }

  getAnimationFrame(frameCount) {
    const animationFrameCount = frameCount % (this.animationFrames.length * this.animationLength); // 0 - 31
    return this.animationFrames[Math.floor(animationFrameCount / this.animationLength)]; // 0 - 3
  }

  getIdleFrame() {
    return this.animationFrames[0];
  }
}
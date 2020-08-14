import { Sprite } from "kontra";

function intBetweenInclusive(low, high) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

class Flower {
  constructor({ row, col, animations, tileSize }) {
    this.sprite = Sprite({
      x: col * tileSize,
      y: row * tileSize,
      animations,
    });

    this.growthStage = 0;
    this.growthInterval = 2000;
    this.lastGrowthStageTimeStamp = Date.now();

    this.flower = intBetweenInclusive(0, 4);
  }

  update() {
    if (Date.now() > this.growthInterval + this.lastGrowthStageTimeStamp) {
      this.growthStage++;
      this.lastGrowthStageTimeStamp = Date.now();
    }

    switch (this.growthStage) {
      case 0:
        this.sprite.playAnimation("seedling");
        break;
      case 1:
        this.sprite.playAnimation("sprout");
        break;
      case 2:
        this.sprite.playAnimation(`flower${this.flower}`);
        break;
      default:
        // other growth stages are ignored
        break;
    }
  }

  render() {
    this.sprite.render();
  }
}

export default Flower;

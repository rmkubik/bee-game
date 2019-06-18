import { Sprite, keyPressed } from "kontra";

class Player {
  constructor(x, y, animations) {
    this.sprite = Sprite({
      x,
      y,
      animations,
      update: () => this.update()
    });

    this.sprite.playAnimation("bee");
  }

  update() {
    if (keyPressed("a")) {
      this.sprite.x += -2;
    } else if (keyPressed("d")) {
      this.sprite.x += 2;
    }

    if (keyPressed("w")) {
      this.sprite.y += -2;
    } else if (keyPressed("s")) {
      this.sprite.y += 2;
    }
  }

  render() {
    this.sprite.render();
  }
}

export default Player;

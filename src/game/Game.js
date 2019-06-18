import {
  init,
  SpriteSheet,
  GameLoop,
  initKeys,
  initPointer,
  Sprite,
  track,
  onPointerDown
} from "kontra";

import Map from "./Map";
import Player from "./Player";

class Game {
  constructor(loader, { tilesWide, tilesHigh, tileSize }) {
    const { canvas } = init("game");

    const gameScale = 3;
    this.canvas = canvas;
    this.canvas.style.transform = `scale(${gameScale})`;

    initKeys();
    initPointer();

    this.loop = GameLoop({
      update: () => this.update(),
      render: () => this.render()
    });

    this.spriteSheet = SpriteSheet({
      image: loader.get("sprites"),
      frameWidth: 8,
      frameHeight: 8,
      animations: {
        bee: {
          frames: 34
        }
      }
    });

    this.player = new Player(80, 100, this.spriteSheet.animations);

    this.map = new Map(loader, { tilesHigh, tilesWide, tileSize, gameScale });

    onPointerDown(({ x, y }, object) => {
      console.log(x, y);
      console.log(this.map.getTile(x, y));
    });
  }

  update() {
    this.player.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (this.player.x > this.canvas.width) {
      this.player.x = -this.player.width;
    }
  }

  render() {
    this.map.render();
    this.player.render();
  }

  start() {
    this.loop.start();
  }
}

export default Game;

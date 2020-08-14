import {
  init,
  SpriteSheet,
  GameLoop,
  initKeys,
  initPointer,
  onPointerDown,
} from "kontra";

import Map from "./Map";
import Player from "./Player";
import Flower from "./Flower";

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
      render: () => this.render(),
    });

    this.spriteSheet = SpriteSheet({
      image: loader.get("sprites"),
      frameWidth: 8,
      frameHeight: 8,
      animations: {
        bee: {
          frames: 34,
          loop: false,
        },
        seedling: {
          frames: 2,
          loop: false,
        },
        sprout: {
          frames: 1,
          loop: false,
        },
        flower0: {
          frames: 0,
          loop: false,
        },
        flower1: {
          frames: 8,
          loop: false,
        },
        flower2: {
          frames: 16,
          loop: false,
        },
        flower3: {
          frames: 24,
          loop: false,
        },
        flower4: {
          frames: 32,
          loop: false,
        },
      },
    });

    this.player = new Player(80, 100, this.spriteSheet.animations);

    this.map = new Map(loader, { tilesHigh, tilesWide, tileSize, gameScale });

    this.seedlings = [];
    onPointerDown(({ x, y }, object) => {
      this.seedlings.push(
        new Flower({
          ...this.map.getTile(x, y),
          animations: this.spriteSheet.animations,
          tileSize,
        })
      );
    });
  }

  update() {
    this.seedlings.forEach((seedling) => seedling.update());

    this.player.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (this.player.x > this.canvas.width) {
      this.player.x = -this.player.width;
    }
  }

  render() {
    this.map.render();
    this.seedlings.forEach((seedling) => seedling.render());
    this.player.render();
  }

  start() {
    this.loop.start();
  }
}

export default Game;

import {
  init,
  Sprite,
  SpriteSheet,
  GameLoop,
  initKeys,
  keyPressed,
  TileEngine
} from "kontra";
import sprites from "../raw/images/sprites.png";
import "./styles/index.css";
import AssetLoader from "./game/Loader";

const createTiles = (height, width) => {
  let count = 0;

  return Array(height * width)
    .fill(5)
    .map(val => {
      if (Math.floor(count / width) % 2 === 0) {
        return count++ % 2 === 0 ? val : 6;
      } else {
        return count++ % 2 === 0 ? 6 : val;
      }
    });
};

const { canvas } = init("game");

initKeys();

// let image = new Image();
// image.src = sprites;

let bg;
let sprite;

const loader = new AssetLoader();
loader.register("sprites", sprites);

loader.startLoading().then(() => {
  const spriteSheet = SpriteSheet({
    image: loader.get("sprites"),
    frameWidth: 8,
    frameHeight: 8,
    animations: {
      bee: {
        frames: 34
      }
    }
  });

  bg = Sprite({
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    color: "#29adff"
  });

  sprite = Sprite({
    x: 100, // starting x,y position of the sprite
    y: 80,
    // color: "red", // fill color of the sprite rectangle
    animations: spriteSheet.animations,
    // width: 20, // width and height of the sprite rectangle
    // height: 40,
    update: () => {
      if (keyPressed("a")) {
        sprite.x += -2;
      } else if (keyPressed("d")) {
        sprite.x += 2;
      }

      if (keyPressed("w")) {
        sprite.y += -2;
      } else if (keyPressed("s")) {
        sprite.y += 2;
      }
    }
  });

  let tileEngine = TileEngine({
    tilewidth: 8,
    tileheight: 8,
    width: 16,
    height: 16,
    tilesets: [
      {
        firstgid: 0,
        image: loader.get("sprites")
      }
    ],

    // layer object
    layers: [
      {
        name: "ground",
        data: createTiles(16, 16)
      }
    ]
  });

  sprite.playAnimation("bee");

  let loop = GameLoop({
    // create the main game loop
    update: function() {
      // update the game state
      sprite.update();

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (sprite.x > canvas.width) {
        sprite.x = -sprite.width;
      }
    },
    render: () => {
      bg.render();
      tileEngine.render();
      sprite.render();
    }
  });

  loop.start(); // start the game
});

// image.onload = () => {

// };

import { TileEngine, track, Sprite } from "kontra";

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

class Map {
  constructor(loader, { tilesHigh, tilesWide, tileSize, gameScale }) {
    this.tilesWide = tilesWide;
    this.tilesHigh = tilesHigh;
    this.tileSize = tileSize;
    this.gameScale = gameScale;

    this.tileEngine = TileEngine({
      tilewidth: tileSize,
      tileheight: tileSize,
      width: tilesWide,
      height: tilesHigh,
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
          data: createTiles(tilesWide, tilesHigh)
        }
      ]
    });

    this.bg = Sprite({
      x: 0,
      y: 0,
      width: tilesWide * tileSize,
      height: tilesHigh * tileSize,
      color: "#29adff"
    });
  }

  render() {
    this.bg.render();
    this.tileEngine.render();
  }

  getTile(x, y) {
    return {
      row: Math.floor(y / (this.tileSize * this.gameScale)),
      col: Math.floor(x / (this.tileSize * this.gameScale))
    };
  }
}

export default Map;

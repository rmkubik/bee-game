import sprites from "../raw/images/sprites.png";
import "./styles/index.css";
import AssetLoader from "./game/Loader";
import Game from "./game/Game";

const loader = new AssetLoader();
loader.register("sprites", sprites);

loader.startLoading().then(() => {
  const game = new Game(loader, { tilesWide: 16, tilesHigh: 16, tileSize: 8 });

  game.start();
});

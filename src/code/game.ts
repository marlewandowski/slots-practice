import { Application, Assets, BlurFilter, Container, Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { loadAssets } from "./utils/assetLoader";
import { createSprites } from "./utils/spritesCreator";
import { createReels } from "./components/reel";
import { createMenu } from "./components/menu";
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 1200;

export async function createGame() {
  const element = document.querySelector<HTMLDivElement>("#app")!;
  const app = new Application<HTMLCanvasElement>({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "blue",
  });
  element?.appendChild(app.view);

  const textures = await loadAssets();
  const sprites: Sprite[] = createSprites(textures);

  const backgroundContainer = new Container();
  app.stage.addChild(backgroundContainer);
  backgroundContainer.addChild(sprites[0]);
  backgroundContainer.filters = [new BlurFilter(9)]
  app.stage.addChild(sprites[1])

  const reels = createReels(app,textures);

  createMenu(app, reels, textures);


}
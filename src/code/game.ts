import { Application, BlurFilter, Container, Graphics, Sprite } from "pixi.js";
import { createMenu } from "./components/menu";
import { Reel } from "./components/reel";
import { symbolDimensions } from "./consts/symbolDimensions";
import { loadAssets } from "./utils/assetLoader";
import { Spin } from "./utils/spin";
import { createSprites } from "./utils/spritesCreator";
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 1200;

export async function createGame() {
  const element = document.querySelector<HTMLDivElement>("#app")!;
  const app = new Application<HTMLCanvasElement>({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "blue",
  });
  element?.appendChild(app.view);

  const textures = await loadAssets();
  const sprites: Sprite[] = createSprites(textures);

  const backgroundContainer = new Container();
  app.stage.addChild(backgroundContainer);
  backgroundContainer.addChild(sprites[0]);
  backgroundContainer.filters = [new BlurFilter(9)];
  const gameboardMask = new Graphics();
    gameboardMask.beginFill(0xffffff);
    gameboardMask.drawRect(50, 50, 1100,  800);
    gameboardMask.endFill();
    backgroundContainer.mask = gameboardMask;
    
  app.stage.addChild(sprites[1])

  const reelContainer = new Container();
  reelContainer.y = 100;
  reelContainer.x = 80;
  app.stage.addChild(reelContainer);
    const reelContainerMask = new Graphics();
    reelContainerMask.beginFill(0xffffff);
    reelContainerMask.drawRect(0, symbolDimensions.SYMBOL_HEIGHT / 3, 1200,  symbolDimensions.SYMBOL_HEIGHT * 3 + 20);
    reelContainerMask.endFill();
    reelContainer.mask = reelContainerMask;

  let reels: any[] = [];
  for(let i = 0; i < 5; i++) 
  {
    let reel = new Reel(app,textures);
    reelContainer.addChild(reel.create(i));
    reels.push(reel);
  }
  const spin = new Spin(app,reels,textures);
  createMenu(app, textures, spin);


}
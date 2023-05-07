import { WinningLines } from './components/winningLines';
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
    resizeTo: window
  });
  element?.appendChild(app.view);

  const textures = await loadAssets();
  const sprites: Sprite[] = createSprites(textures);
  const gameBoardContainer = new Container();
  const backgroundContainer = new Container();
  const backGroundSprite = sprites[0];
  backGroundSprite.height = 850;
  backGroundSprite.width = 1150;
  backgroundContainer.addChild(sprites[0]);
  backgroundContainer.filters = [new BlurFilter(9)];
  const gameboardMask = new Graphics();
  gameboardMask.beginFill(0xffffff);
  gameboardMask.drawRect(backgroundContainer.width * 0.03, backgroundContainer.height * 0.05, backgroundContainer.width, backgroundContainer.height);
  gameboardMask.endFill();
  backgroundContainer.mask = gameboardMask;
  gameBoardContainer.addChild(backgroundContainer);
  gameBoardContainer.addChild(sprites[1]);
  gameBoardContainer.position.set(
    innerWidth / 2 - gameBoardContainer.width/2,
    window.innerHeight / 2 - gameBoardContainer.height / 2);
  app.stage.addChild(gameBoardContainer);
  const reelContainer = new Container();
  reelContainer.y = 100;
  reelContainer.x = 80;
  gameBoardContainer.addChild(reelContainer);


  let reels: any[] = [];
  for(let i = 0; i < 5; i++) 
  {
    let reel = new Reel(app,textures);
    reelContainer.addChild(reel.create(i));
    reels.push(reel);
  }
  const reelContainerMask = new Graphics();
  reelContainerMask.beginFill(0xffffff);
  reelContainerMask.drawRect(0, reelContainer.height * 0.05, reelContainer.width,  reelContainer.height * 0.75);
  reelContainerMask.endFill();
  reelContainer.mask = reelContainerMask;
  const spin = new Spin(app,reels,textures);
  const menuContainer = createMenu(app, textures, spin);
  const winningLines = new WinningLines(reelContainer, reels);
  winningLines.assignPositions();

  
  window.addEventListener('resize', resize);
  resize();
  function resize() {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      const scaleFactor = Math.min(
          window.innerWidth / (gameBoardContainer.width + menuContainer.width),
          window.innerHeight / (gameBoardContainer.height + menuContainer.height)
      );
      
      app.stage.scale.set(scaleFactor);
  }
}
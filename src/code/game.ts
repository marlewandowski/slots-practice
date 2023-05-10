import { WinningLines } from './components/winningLines';
import { Application, BlurFilter, Container, Graphics, Sprite } from "pixi.js";
import { createMenu } from "./components/menu";
import { Reel } from "./components/reel";
import { symbolDimensions } from "./consts/symbolDimensions";
import { loadAssets } from "./utils/assetLoader";
import { Spin, stopSpinEmitter } from "./utils/spin";
import { createSprites } from "./utils/spritesCreator";

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
  gameBoardContainer.width = window.innerWidth / 5;
  gameBoardContainer.height = window.innerHeight / 5;
  const backgroundContainer = new Container();
  const backGroundSprite = sprites[0];
  const borderSprite = sprites[1];
  backGroundSprite.height = 800;
  backGroundSprite.width = 1100;
  backgroundContainer.addChild(backGroundSprite);
  backgroundContainer.filters = [new BlurFilter(9)];
  backgroundContainer.position.set(50, 50);

  gameBoardContainer.addChild(backgroundContainer);
  gameBoardContainer.addChild(borderSprite);
  gameBoardContainer.position.set(
    window.innerWidth / 2,
    window.innerHeight / 2);
  app.stage.addChild(gameBoardContainer);
  const reelContainer = new Container();
  gameBoardContainer.addChild(reelContainer);

  let reels: any[] = [];
  for (let i = 0; i < 5; i++) {
    let reel = new Reel(app, textures);
    reelContainer.addChild(reel.create(i));
    reels.push(reel);
  }
  reelContainer.position.set(
    (gameBoardContainer.width - reelContainer.width) / 2 - 25,
    symbolDimensions.SYMBOL_HEIGHT / 2);

  const reelMask = new Graphics();
  reelMask.beginFill(0xFFFFFF, 1);
  reelMask.drawRect(
    reelContainer.x + 25,
    reelContainer.y,
    reelContainer.width,
    reelContainer.height * 0.812);
  reelMask.position.set(0, -40);
  reelContainer.mask = reelMask;
  gameBoardContainer.addChild(reelMask);
  const spin = new Spin(app, reels, textures);
  const menuContainer = createMenu(app, textures, spin);
  gameBoardContainer.addChild(menuContainer);
  const winningLines = new WinningLines(reelContainer, reels);
  stopSpinEmitter.once("stopSpin", () => {
    winningLines.assignPositions();
  });

  window.addEventListener('resize', resize);
  resize();
  function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    const scaleFactor = Math.min(
      window.innerWidth / (gameBoardContainer.width * 2),
      window.innerHeight / (gameBoardContainer.height * 2)
    );

    app.stage.scale.set(scaleFactor);
  }
}

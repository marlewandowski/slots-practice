import { Application, Assets, BlurFilter, Container, Graphics, Resource, Sprite, Texture, filters } from "pixi.js";
import { ReelSprite } from "../common/reelSprite";

export function createReels(app: Application,textures: Record<string, Texture<Resource>>): any[] {
  const SYMBOL_WIDTH = 200;
  const SYMBOL_HEIGHT = 240;
  const reels = [];
  const reelContainer = new Container();

  for (let i = 0; i < 5; i++) {
    const symbolContainer = new Container();
    symbolContainer.x = i * SYMBOL_WIDTH;
    reelContainer.addChild(symbolContainer);
    const reelContainerMask = new Graphics();
    reelContainerMask.beginFill(0xffffff);
    reelContainerMask.drawRect(0, SYMBOL_HEIGHT / 3, 1200,  SYMBOL_HEIGHT * 3 + 20);
    reelContainerMask.endFill();
    reelContainer.mask = reelContainerMask;
    const reel = {
      container: symbolContainer,
      symbols: <any>[],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter(),
    }

    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    symbolContainer.filters = [reel.blur];

    for (let j = 0; j < 4; j++) { 
      const symbol = new ReelSprite(textures, Math.floor(Math.random() * 4));
      symbol.y = j * SYMBOL_HEIGHT;
      symbol.x = Math.round((SYMBOL_HEIGHT - symbol.width) / 2);
      reel.symbols.push(symbol);
      symbolContainer.addChild(symbol);
    }
    reels.push(reel);
  }
  app.stage.addChild(reelContainer);

  const margin = (app.screen.height - SYMBOL_HEIGHT * 3) / 2;
  reelContainer.y = 100;
  reelContainer.x = 80;
  const top = new Graphics();
  top.beginFill(0, 1);
  top.drawRect(0, 0, app.screen.width, margin);
  const bottom = new Graphics();
  bottom.beginFill(0, 1);
  bottom.drawRect(0, SYMBOL_HEIGHT * 3 + margin, app.screen.width, margin);

  return reels;
}
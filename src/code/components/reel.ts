import { Application, BlurFilter, Container, Resource, Texture } from "pixi.js";
import { ReelColumn } from "../common/reelColumn";
import { ReelSprite } from "../common/reelSprite";
import { symbolDimensions } from "../consts/symbolDimensions";

export class Reel {
  public column: ReelColumn;
  constructor(
    private app: Application,
    private textures: Record<string, Texture<Resource>>
  ) {}

  create(column: number): Container {
    const symbolContainer = new Container();
    symbolContainer.x = column * symbolDimensions.SYMBOL_WIDTH;
    this.column = {
      container: symbolContainer,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter(),
    }
    this.column.blur.blurX = 0;
    this.column.blur.blurY = 0;
    symbolContainer.filters = [this.column.blur];

    for (let j = 0; j < 4; j++) { 
      const symbol = new ReelSprite(this.textures, Math.floor(Math.random() * 4));
      symbol.sprite.y = j * symbolDimensions.SYMBOL_HEIGHT;
      symbol.sprite.x = Math.round((symbolDimensions.SYMBOL_HEIGHT - symbol.sprite.width) / 2);
      this.column.symbols.push(symbol);
      symbolContainer.addChild(symbol.sprite);
    }
    return symbolContainer;
  }
}

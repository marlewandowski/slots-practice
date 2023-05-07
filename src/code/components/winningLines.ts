import { ColorMatrixFilter, Container, Filter, Graphics, Ticker } from "pixi.js";
import { Reel } from "./reel";
import { symbolDimensions } from "../consts/symbolDimensions";
import { lineEmitter, scoreEmitter } from "../common/state";
import { GlowFilter } from "pixi-filters";
import { spinEmitter } from "../utils/spin";

export class WinningLines {
  constructor(
    private reelContainer: Container,
    private reels: Reel[]
  ) {}
  flashCount = 0;
  maxFlashes = 10;

  line1 = new Graphics();
  line2 = new Graphics();
  line3 = new Graphics();
  line4 = new Graphics();
  line5 = new Graphics();
  line6 = new Graphics();
  line7 = new Graphics();
  line8 = new Graphics();
  line9 = new Graphics();
  filter = new GlowFilter({
    distance: 15,
    outerStrength: 3,
    color: 0xFFFFFF
  });

  symbolPositions:[{x: number, y: number}[]?] = [];

  assignPositions() {
    this.reels.forEach(reel=>{
      let columnSymbols:{x: number, y: number}[] = [];
      reel.column.symbols.forEach(symbol=>{
        columnSymbols.push(
          {
            x:symbol.sprite.getGlobalPosition().x - 20,
            y:symbol.sprite.getGlobalPosition().y - symbolDimensions.SYMBOL_HEIGHT / 2
          });
      });
      columnSymbols.pop();
      this.symbolPositions.push(columnSymbols);
    });
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
    this.drawLine5();
    this.drawLine6();
    this.drawLine7();
    this.drawLine8();
    this.drawLine9();

    lineEmitter.on("showLine", (value: number) => {
      this.showLine(value);
    
    spinEmitter.once('spin', () => {
      this.clearLines();
      });
  })

  }

  drawLine1() {
    this.line1.lineStyle(10,0xFF0000);
    this.line1.moveTo(this.symbolPositions.at(0).at(1).x, this.symbolPositions.at(0).at(1).y);
    this.line1.lineTo(this.symbolPositions.at(1).at(1).x, this.symbolPositions.at(1).at(1).y);
    this.line1.lineTo(this.symbolPositions.at(2).at(1).x, this.symbolPositions.at(2).at(1).y);
    this.line1.lineTo(this.symbolPositions.at(3).at(1).x, this.symbolPositions.at(3).at(1).y);
    this.line1.lineTo(this.symbolPositions.at(4).at(1).x, this.symbolPositions.at(4).at(1).y)
    this.line1.visible = false;
    this.line1.filters = [this.filter];
    this.reelContainer.addChild(this.line1);
  }

  drawLine2() {
    this.line2.lineStyle(10,0xFFA500);
    this.line2.moveTo(this.symbolPositions.at(0).at(0).x, this.symbolPositions.at(0).at(0).y);
    this.line2.lineTo(this.symbolPositions.at(1).at(0).x, this.symbolPositions.at(1).at(0).y);
    this.line2.lineTo(this.symbolPositions.at(2).at(0).x, this.symbolPositions.at(2).at(0).y);
    this.line2.lineTo(this.symbolPositions.at(3).at(0).x, this.symbolPositions.at(3).at(0).y);
    this.line2.lineTo(this.symbolPositions.at(4).at(0).x, this.symbolPositions.at(4).at(0).y)
    this.line2.visible = false;
    this.line2.filters = [this.filter];
    this.reelContainer.addChild(this.line2);
  }

  drawLine3() {
    this.line3.lineStyle(10,0x008000 );
    this.line3.moveTo(this.symbolPositions.at(0).at(2).x, this.symbolPositions.at(0).at(2).y);
    this.line3.lineTo(this.symbolPositions.at(1).at(2).x, this.symbolPositions.at(1).at(2).y);
    this.line3.lineTo(this.symbolPositions.at(2).at(2).x, this.symbolPositions.at(2).at(2).y);
    this.line3.lineTo(this.symbolPositions.at(3).at(2).x, this.symbolPositions.at(3).at(2).y);
    this.line3.lineTo(this.symbolPositions.at(4).at(2).x, this.symbolPositions.at(4).at(2).y)
    this.line3.visible = false;
    this.line3.filters = [this.filter];
    this.reelContainer.addChild(this.line3);
  }

  drawLine4() {
    this.line4.lineStyle(10,0x0000FF);
    this.line4.moveTo(this.symbolPositions.at(0).at(0).x, this.symbolPositions.at(0).at(0).y);
    this.line4.lineTo(this.symbolPositions.at(1).at(1).x, this.symbolPositions.at(1).at(1).y);
    this.line4.lineTo(this.symbolPositions.at(2).at(2).x, this.symbolPositions.at(2).at(2).y);
    this.line4.lineTo(this.symbolPositions.at(3).at(1).x, this.symbolPositions.at(3).at(1).y);
    this.line4.lineTo(this.symbolPositions.at(4).at(0).x, this.symbolPositions.at(4).at(0).y)
    this.line4.visible = false;
    this.line4.filters = [this.filter];
    this.reelContainer.addChild(this.line4);
  }

  drawLine5() {
    this.line5.lineStyle(10,0xADD8E6);
    this.line5.moveTo(this.symbolPositions.at(0).at(2).x, this.symbolPositions.at(0).at(2).y);
    this.line5.lineTo(this.symbolPositions.at(1).at(1).x, this.symbolPositions.at(1).at(1).y);
    this.line5.lineTo(this.symbolPositions.at(2).at(0).x, this.symbolPositions.at(2).at(0).y);
    this.line5.lineTo(this.symbolPositions.at(3).at(1).x, this.symbolPositions.at(3).at(1).y);
    this.line5.lineTo(this.symbolPositions.at(4).at(2).x, this.symbolPositions.at(4).at(2).y)
    this.line5.visible = false;
    this.line5.filters = [this.filter];
    this.reelContainer.addChild(this.line5);
  }

  drawLine6() {
    this.line6.lineStyle(10,0x4B0082);
    this.line6.moveTo(this.symbolPositions.at(0).at(1).x, this.symbolPositions.at(0).at(1).y);
    this.line6.lineTo(this.symbolPositions.at(1).at(2).x, this.symbolPositions.at(1).at(2).y);
    this.line6.lineTo(this.symbolPositions.at(2).at(1).x, this.symbolPositions.at(2).at(1).y);
    this.line6.lineTo(this.symbolPositions.at(3).at(0).x, this.symbolPositions.at(3).at(0).y);
    this.line6.lineTo(this.symbolPositions.at(4).at(1).x, this.symbolPositions.at(4).at(1).y)
    this.line6.visible = false;
    this.line6.filters = [this.filter];
    this.reelContainer.addChild(this.line6);
  }

  drawLine7() {
    this.line7.lineStyle(10,0xEE82EE);
    this.line7.moveTo(this.symbolPositions.at(0).at(1).x, this.symbolPositions.at(0).at(1).y);
    this.line7.lineTo(this.symbolPositions.at(1).at(0).x, this.symbolPositions.at(1).at(0).y);
    this.line7.lineTo(this.symbolPositions.at(2).at(1).x, this.symbolPositions.at(2).at(1).y);
    this.line7.lineTo(this.symbolPositions.at(3).at(2).x, this.symbolPositions.at(3).at(2).y);
    this.line7.lineTo(this.symbolPositions.at(4).at(1).x, this.symbolPositions.at(4).at(1).y)
    this.line7.visible = false;
    this.line7.filters = [this.filter];
    this.reelContainer.addChild(this.line7);
  }

  drawLine8() {
    this.line8.lineStyle(10,0xFFC0CB);
    this.line8.moveTo(this.symbolPositions.at(0).at(0).x, this.symbolPositions.at(0).at(0).y);
    this.line8.lineTo(this.symbolPositions.at(1).at(0).x, this.symbolPositions.at(1).at(0).y);
    this.line8.lineTo(this.symbolPositions.at(2).at(1).x, this.symbolPositions.at(2).at(1).y);
    this.line8.lineTo(this.symbolPositions.at(3).at(0).x, this.symbolPositions.at(3).at(0).y);
    this.line8.lineTo(this.symbolPositions.at(4).at(0).x, this.symbolPositions.at(4).at(0).y)
    this.line8.visible = false;
    this.line8.filters = [this.filter];
    this.reelContainer.addChild(this.line8);
  }

  drawLine9() {
    this.line9.lineStyle(10,0xFFFF00 );
    this.line9.moveTo(this.symbolPositions.at(0).at(2).x, this.symbolPositions.at(0).at(2).y);
    this.line9.lineTo(this.symbolPositions.at(1).at(2).x, this.symbolPositions.at(1).at(2).y);
    this.line9.lineTo(this.symbolPositions.at(2).at(1).x, this.symbolPositions.at(2).at(1).y);
    this.line9.lineTo(this.symbolPositions.at(3).at(2).x, this.symbolPositions.at(3).at(2).y);
    this.line9.lineTo(this.symbolPositions.at(4).at(2).x, this.symbolPositions.at(4).at(2).y)
    this.line9.visible = false;
    this.line9.filters = [this.filter];
    this.reelContainer.addChild(this.line9);
  }

  public showLine(line: number) {
    let elapsed = 0;
    const ticker = new Ticker();
    ticker.add((delta) => {
      elapsed += delta * ticker.elapsedMS;
      if (elapsed > 300){
        switch (line)
        {
          case 1:
            this.line1.visible = !this.line1.visible;
            break;
          case 2:
            this.line2.visible = !this.line2.visible;
            break;
          case 3:
            this.line3.visible = !this.line3.visible;
            break;
          case 4:
            this.line4.visible = !this.line4.visible;
            break;
          case 5:
            this.line5.visible = !this.line5.visible;
            break;
          case 6:
            this.line6.visible = !this.line6.visible;
            break;
          case 7:
            this.line7.visible = !this.line7.visible;
            break;
          case 8:
            this.line8.visible = !this.line8.visible;
            break;
          case 9:
            this.line9.visible = !this.line9.visible;
            break;
        }

        elapsed = 0
      }
    })
    ticker.start();
    setTimeout(() => {
      switch (line)
      {
        case 1:
          this.line1.visible = true;
          break;
        case 2:
          this.line2.visible = true;
          break;
        case 3:
          this.line3.visible = true;
          break;
        case 4:
          this.line4.visible = true;
          break;
        case 5:
          this.line5.visible = true;
          break;
        case 6:
          this.line6.visible = true;
          break;
        case 7:
          this.line7.visible = true;
          break;
        case 8:
          this.line8.visible = true;
          break;
        case 9:
          this.line9.visible = true;
          break;
      }
      ticker.stop();
    }, 1500);
  }

  clearLines() {
    this.line1.visible = false;
    this.line2.visible = false;
    this.line3.visible = false;
    this.line4.visible = false;
    this.line5.visible = false;
    this.line6.visible = false;
    this.line7.visible = false;
    this.line8.visible = false;
    this.line9.visible = false;
  }
}
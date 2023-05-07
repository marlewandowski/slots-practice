import { State } from './../common/state';
import { Application, Resource, Texture } from "pixi.js";
import { symbolNames } from "../consts/symbolnames";
import { symbolDimensions } from "../consts/symbolDimensions";

const REELS_QUANTITY = 5;
const SYMBOLS_IN_REEL = 3;
const EventEmitter = require('eventemitter3');
export const stopSpinEmitter = new EventEmitter();
export const spinEmitter = new EventEmitter();
enum SpinStates {
  Idle,
  StartSpin,
  Spin,
  StopSpin
}

const SPIN_VELOCITY = 30;

export class Spin {
  private state: SpinStates = SpinStates.Idle;
  private gameState: State;
  private velocity: number = 0;
  private isSpinning: boolean = false;
  private outcome: number[][] = [];
  private setOutcomeSymbols = 0;
  private setLastRow: number = 0;
  public constructor(
    private app: Application,
    private reels: any[],
    private textures: Record<string,Texture<Resource>>
  )
  {
    app.ticker.add(this.onUpdate);
  }

  public start(gameState: State): void {
    spinEmitter.emit("spin");
    if(this.isSpinning) {
      return;
    }
    this.gameState = gameState;
    this.state = SpinStates.StartSpin;
    this.isSpinning = true;

    setTimeout(
      () => 
        //outcome
        this.stop([
          [1,1,1,1,1],
          [2,2,2,2,2],
          [3,3,3,3,3]
        ],gameState),
      3000
    );
  }

  public stop(outcome: number[][], gameState: State): void {
    this.outcome = outcome;
    this.state = SpinStates.StopSpin;
    this.setOutcomeSymbols = 0;
    this.setLastRow = 0;
  }

  private onUpdate = (delta: number): void => {
    switch(this.state) {
      case SpinStates.StartSpin:
        this.velocity += 0.3 * delta;
        this.updateSymbols(delta);
        if(this.velocity >= SPIN_VELOCITY) {
          this.velocity = SPIN_VELOCITY;
          this.state = SpinStates.Spin;
        }
        return;
      case SpinStates.Spin:
        this.updateSymbols(delta);
        return;
      case SpinStates.StopSpin:
        this.updateSymbols(delta);
        if (this.setOutcomeSymbols >= 5) {
          this.velocity = Math.max(this.velocity - 0.7 * delta, 10);
        }
        if(this.setOutcomeSymbols == 15 && this.setLastRow == 5) {
          this.state = SpinStates.Idle; 
          this.isSpinning = false;  
          this.gameState.getState(this.reels);
          stopSpinEmitter.emit('stopSpin');
      }
        return;
      default:
        return;
    }
  };

  private updateSymbols(delta:number): void {
    this.reels.forEach((reel) => {
      reel.column.symbols.forEach((symbol: any) => {
        symbol.sprite.y += delta * this.velocity;
        if (symbol.sprite.y > symbolDimensions.SYMBOL_HEIGHT * 3) {
          if(this.setOutcomeSymbols == 15){
            this.setLastRow ++;
          }
          let symbolValue = Math.floor(Math.random() * 5);
          if (this.state === SpinStates.StopSpin && this.setOutcomeSymbols != SYMBOLS_IN_REEL * REELS_QUANTITY) {
            const row = Math.min(
              SYMBOLS_IN_REEL - 1,
              SYMBOLS_IN_REEL - 
              Math.ceil((this.setOutcomeSymbols + 1) / REELS_QUANTITY)
            );
            symbolValue = this.outcome[row][this.setOutcomeSymbols % REELS_QUANTITY];
            this.setOutcomeSymbols++;
          }
          symbol.sprite.texture = this.textures[symbolNames.at(symbolValue)];
          symbol.spriteValue = symbolValue;
          symbol.sprite.x = Math.round(
            (symbolDimensions.SYMBOL_HEIGHT - symbol.sprite.width) / 2
          );
          symbol.sprite.y = symbol.sprite.y - symbolDimensions.SYMBOL_HEIGHT * 4;
        }
      })
    })
  }
}

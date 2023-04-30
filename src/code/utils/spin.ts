import { Application, Resource, Texture } from "pixi.js";
import { symbolNames } from "../consts/symbolnames";
import { State } from "../common/state";

const REELS_QUANTITY = 5;
const SYMBOLS_IN_REEL = 3;
const SYMBOL_WIDTH = 200;
const SYMBOL_HEIGHT = 240;
const EventEmitter = require('eventemitter3');
export const  emitter = new EventEmitter();

enum SpinStates {
  Idle,
  StartSpin,
  Spin,
  StopSpin
}

const SPIN_VELOCITY = 30;

export class Spin {
  private state: SpinStates = SpinStates.Idle;
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

  public start(): void {
    if(this.isSpinning) {
      return;
    }
    this.state = SpinStates.StartSpin;
    this.isSpinning = true;

    setTimeout(
      () => 
        //outcome
        this.stop([
          [1,1,1,1,1],
          [2,2,2,2,2],
          [3,3,3,3,3]
        ]),
      3000
    );
  }

  public stop(outcome: number[][]): void {
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
          emitter.emit('stopSpin');  
      }
        return;
      default:
        return;
    }
  };

  private updateSymbols(delta:number): void {
    this.reels.forEach((reel) => {
      reel.symbols.forEach((symbol: any) => {
        symbol.sprite.y += delta * this.velocity;
        if (symbol.sprite.y > SYMBOL_HEIGHT * 3) {
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
          symbol.sprite.x = Math.round(
            (SYMBOL_HEIGHT - symbol.sprite.width) / 2
          );
          symbol.sprite.y = symbol.sprite.y - SYMBOL_HEIGHT * 4;
        }
      })
    })
  }
}

export function spin(app: Application, reels:any[], textures: Record<string, Texture<Resource>>,state: State) {
  let running = false;
  let scoreChecked = false;
  const tweening = <any>[];

  if(running) return;
  running = true;

  for(let i = 0; i < reels.length; i++) {
    const reel = reels[i];
    const extra = Math.floor(Math.random()*3);
    const target = reel?.position + 10;
    const time = 2000 + extra * 600;
    tweenTo(reel, 'position', target, time, backout(0.5), 
    null, i === reels.length -1 ? reelsComplete : null)
  }

function reelsComplete() {
  running = false;
}

app.ticker.add((delta) => {
  for (let i = 0; i < reels.length; i++) {
    const reel = reels[i];
    reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
    reel.previousPosition = reel.position;

    for (let j = 0; j < reel.symbols.length; j++) {
      const symbol = reel.symbols[j];
      const prevY = symbol.sprite.y;
      symbol.sprite.y = (((reel.position + j) % reel.symbols.length) * SYMBOL_HEIGHT - SYMBOL_HEIGHT / 2 - SYMBOL_HEIGHT) ;
      if (symbol.sprite.y < 0 && prevY > SYMBOL_HEIGHT) {
        newSymbol(symbol,Math.floor(Math.random() * 5) );
      }
      symbol.sprite.y = symbol.sprite.y + SYMBOL_HEIGHT/2;
    }
  }
});

function newSymbol(symbol: any, symbolValue: number) {
  symbol.sprite.texture = textures[symbolNames.at(symbolValue)];
  symbol.sprite.spriteValue = symbolValue
  symbol.sprite.x = Math.round((SYMBOL_HEIGHT -symbol.sprite.width) / 2);
}

function tweenTo(object:any, property:any, target:any, time:any, easing:any, onchange:any, oncomplete:any) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}

app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }

    if (!running && !scoreChecked)
    {
      state.rollScore(reels);
      scoreChecked = true;
    }
});

function lerp(a1:any, a2:any, t:any) {
    return a1 * (1 - t) + a2 * t;
}

function backout(amount:any) {
    return (t:any) => (--t * t * ((amount + 1) * t + amount) + 1);
}
}
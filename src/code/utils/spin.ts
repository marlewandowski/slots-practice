import { Application, Resource, Texture } from "pixi.js";
import { checkScore } from "./checkScore";
import { symbolNames } from "../consts/symbolnames";

const SYMBOL_WIDTH = 200;
const SYMBOL_HEIGHT = 240;

export function spin(app: Application, reels:any[], textures: Record<string, Texture<Resource>>) {
  let running = false;
  let scoreChecked = false;
  const tweening = <any>[];

  if(running) return;
  running = true;

  for(let i = 0; i < reels.length; i++) {
    const reel = reels[i];
    const extra = Math.floor(Math.random()*3);
    const target = reel?.position + 10 + i * 10 + extra;
    const time = 2500 + i * 600 + extra * 600;
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
      const prevY = symbol.y;
      symbol.y = (((reel.position + j) % reel.symbols.length) * SYMBOL_HEIGHT - SYMBOL_HEIGHT / 2 - SYMBOL_HEIGHT) ;
      if (symbol.y < 0 && prevY > SYMBOL_HEIGHT) {
        newSymbol(symbol,Math.floor(Math.random() * 5) );
      }
      symbol.y = symbol.y + SYMBOL_HEIGHT/2;
    }
  }
  if (!running && !scoreChecked)
  {
    checkScore(reels,textures);
    scoreChecked = true;
  }

});

function newSymbol(symbol: any, symbolValue: number) {
  symbol.texture = textures[symbolNames.at(symbolValue)];
  symbol.spriteValue = symbolValue
  symbol.x = Math.round((SYMBOL_HEIGHT -symbol.width) / 2);
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
});

function lerp(a1:any, a2:any, t:any) {
    return a1 * (1 - t) + a2 * t;
}

function backout(amount:any) {
    return (t:any) => (--t * t * ((amount + 1) * t + amount) + 1);
}
}
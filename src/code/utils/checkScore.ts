import { Resource, Texture } from "pixi.js";

export function checkScore(reels: any, textures: Record<string, Texture<Resource>>) {
  let board: any[] = [];
  reels.forEach((reel:any) => {
    let reelSymbols: any[] = [];
    let reelValues: any[] = [];
    for(let i = 0; i<reel.symbols.length; i++)
    {
      reelSymbols.push(reel.symbols[i]);
      reelSymbols.sort((a:any,b:any) => a.transform.position.y - b.transform.position.y)
      reelValues = reelSymbols.map(x=>x.spriteValue);
      reelValues.shift();
    } 
  board.push(reelValues);
  console.log(board);
 }); 
}
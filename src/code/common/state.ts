export class State {
  credits: number = 10;
  score: number = 0;
  combo: number = 0;


  public rollScore(reels:any) {
    this.credits -= 1;
    let reelValues = this.getState(reels);
    this.checkScore(reelValues);
  }

  private getState(reels: any): any[] {
    let result:any[] = [];
    reels.forEach((reel:any) => {
      let reelSymbols: any[] = [];
      let reelValues: any[] = [];
      for(let i = 0; i<reel.symbols.length; i++)
      {
        reelSymbols.push(reel.symbols[i]);
        reelSymbols.sort((a:any,b:any) => a.sprite.transform.position.y - b.sprite.transform.position.y)
        reelValues = reelSymbols.map(x=>x.sprite.spriteValue);
        reelValues.shift();        
      } 
      result.push(reelValues);
   }); 
   return result;
  }

  private checkScore(reelValues: any[]) {
    for(let i = 0; i < 2; i++)
    {
      if(reelValues[i][0] == reelValues[i+1][0] && reelValues[i][0] == reelValues[i+2][0])
      {
        this.score += 10;
        this.credits += 10;
      }
      if(reelValues[i][1] == reelValues[i+1][1] && reelValues[i][1] == reelValues[i+2][1])
      {
        this.score += 10;
        this.credits += 10;
      }
      if(reelValues[i][2] == reelValues[i+1][2] && reelValues[i][2] == reelValues[i+2][2])
      {
        this.score += 10;
        this.credits += 10;
      }        
    }
    console.log(this.credits,this.score);
  }
}
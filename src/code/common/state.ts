export class State {
  credits: number = 10;
  score: number = 0;
  combo: number = 0;
  spins: number = 0;

  public rollScore(reels:any) {
    this.credits -= 1;
    this.spins += 1;
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
    //1-3
    if( reelValues[0][0] == reelValues[1][0] &&   
        reelValues[0][0] == reelValues[2][0] &&
        reelValues[0][0] == reelValues[3][0] &&
        reelValues[0][0] == reelValues[4][0] ) 
    {
      this.score += 100;
      this.credits += 100;
    }  
    if( reelValues[0][1] == reelValues[1][1] &&
        reelValues[0][1] == reelValues[2][2] &&
        reelValues[0][1] == reelValues[3][1] && 
        reelValues[0][1] == reelValues[4][1] )     
    {
      this.score += 100;
      this.credits += 100;
    }    
    if( reelValues[0][2] == reelValues[1][2] &&
        reelValues[0][2] == reelValues[2][2] &&
        reelValues[0][2] == reelValues[3][2] &&
        reelValues[0][2] == reelValues[4][2] )     
    {
      this.score += 100;
      this.credits += 100;
    }
    //4,8
    if( reelValues[0][0] == reelValues[1][1] &&
        reelValues[0][0] == reelValues[2][2] &&
        reelValues[0][0] == reelValues[3][1] &&
        reelValues[0][0] == reelValues[4][0] )     
    {
      this.score += 100;
      this.credits += 100;
    }    
    if(reelValues[0][0] == reelValues[1][0] &&
       reelValues[0][0] == reelValues[2][1] &&
       reelValues[0][0] == reelValues[3][0] && 
       reelValues[0][0] == reelValues[4][0] )     
    {
      this.score += 100;
      this.credits += 100;
    }
    //5,7
    if(reelValues[0][1] == reelValues[1][2] &&
       reelValues[0][1] == reelValues[2][2] && 
       reelValues[0][1] == reelValues[3][0] && 
       reelValues[0][1] == reelValues[4][1] )     
    {
      this.score += 100;
      this.credits += 100;
    }    
    if( reelValues[0][1] == reelValues[1][0] &&
        reelValues[0][1] == reelValues[2][2] &&
        reelValues[0][1] == reelValues[3][2] &&
        reelValues[0][1] == reelValues[4][1] )     
    {
      this.score += 100;
      this.credits += 100;
    }
    //5,9
    if(reelValues[0][2] == reelValues[1][1] &&
       reelValues[0][2] == reelValues[2][0] && 
       reelValues[0][2] == reelValues[3][1] && 
       reelValues[0][2] == reelValues[4][2] )     
    {
      this.score += 100;
      this.credits += 100;
    }    
    if(reelValues[0][2] == reelValues[1][2] &&
       reelValues[0][2] == reelValues[2][1] && 
       reelValues[0][2] == reelValues[3][2] && 
       reelValues[0][2] == reelValues[4][2] )     
    {
      this.score += 100;
      this.credits += 100;
    }
    console.log(this.credits,this.score);
  }
}
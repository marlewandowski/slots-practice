import EventEmitter from "eventemitter3";
export const  balanceEmitter = new EventEmitter();
export const  scoreEmitter = new EventEmitter();
export const lineEmitter = new EventEmitter();
export const subtractBalanceEmitter = new EventEmitter();
export class State {
  balance: number = 1000;
  score: number = 0;
  combo: number = 0;
  bet: number = 5;
  reels: any[];

  public getState(reels: any): any[] {
    let result:any[] = [];
    reels.forEach((reel:any) => {
      let reelSymbols: any[] = [];
      let reelValues: any[] = [];
      for(let i = 0; i<reel.column.symbols.length; i++)
      {
        reelSymbols.push(reel.column.symbols[i]);
        reelSymbols.sort((a:any,b:any) => a.sprite.transform.position.y - b.sprite.transform.position.y)
        reelValues = reelSymbols.map(x=>x.spriteValue);      
      } 
      result.push(reelValues);
   }); 
   result.forEach((result: number[]) => {
    result.splice(0,1);
   });
   this.checkScore(result);
   return result;
  }

  private checkScore(reelValues: any[]) {
    let win = false;
    //1-3
    if( reelValues[0][0] == reelValues[1][0] &&   
        reelValues[0][0] == reelValues[2][0] &&
        reelValues[0][0] == reelValues[3][0] &&
        reelValues[0][0] == reelValues[4][0] ) 
    {
      win = true;
      lineEmitter.emit("showLine",2);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }  
    if( reelValues[0][1] == reelValues[1][1] &&
        reelValues[0][1] == reelValues[2][1] &&
        reelValues[0][1] == reelValues[3][1] && 
        reelValues[0][1] == reelValues[4][1] )     
    {
      win = true;
      lineEmitter.emit("showLine",1);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }    
    if( reelValues[0][2] == reelValues[1][2] &&
        reelValues[0][2] == reelValues[2][2] &&
        reelValues[0][2] == reelValues[3][2] &&
        reelValues[0][2] == reelValues[4][2] )     
    {
      win = true;
      lineEmitter.emit("showLine",3);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }
    //4,8
    if( reelValues[0][0] == reelValues[1][1] &&
        reelValues[0][0] == reelValues[2][2] &&
        reelValues[0][0] == reelValues[3][1] &&
        reelValues[0][0] == reelValues[4][0] )     
    {
      win = true;
      lineEmitter.emit("showLine",4);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }    
    if(reelValues[0][0] == reelValues[1][0] &&
       reelValues[0][0] == reelValues[2][1] &&
       reelValues[0][0] == reelValues[3][0] && 
       reelValues[0][0] == reelValues[4][0] )     
    {
      win = true;
      lineEmitter.emit("showLine",8);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }
    //6,7
    if(reelValues[0][1] == reelValues[1][2] &&
       reelValues[0][1] == reelValues[2][1] && 
       reelValues[0][1] == reelValues[3][0] && 
       reelValues[0][1] == reelValues[4][1] )     
    {
      win = true;
      lineEmitter.emit("showLine",6);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }    
    if( reelValues[0][1] == reelValues[1][0] &&
        reelValues[0][1] == reelValues[2][1] &&
        reelValues[0][1] == reelValues[3][2] &&
        reelValues[0][1] == reelValues[4][1] )     
    {
      win = true;
      lineEmitter.emit("showLine",7);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }
    //5,9
    if(reelValues[0][2] == reelValues[1][1] &&
       reelValues[0][2] == reelValues[2][0] && 
       reelValues[0][2] == reelValues[3][1] && 
       reelValues[0][2] == reelValues[4][2] )     
    {
      win = true;
      lineEmitter.emit("showLine",5);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }    
    if(reelValues[0][2] == reelValues[1][2] &&
       reelValues[0][2] == reelValues[2][1] && 
       reelValues[0][2] == reelValues[3][2] && 
       reelValues[0][2] == reelValues[4][2] )     
    {
      win = true;
      lineEmitter.emit("showLine",9);
      this.updateScore(this.bet * 3);
      this.updateBalance(this.bet * 3);
    }
    if(win == false) {
      this.subtractBalance();
    }
  }

  updateScore(value: number) {
    this.score += value;
    scoreEmitter.emit("updateScore", value);
  }

  updateBalance(value: number) {
    this.balance += value;
    balanceEmitter.emit("updateBalance", value);
  }

  subtractBalance() {
    this.balance = this.balance - this.bet;
    subtractBalanceEmitter.emit("subtractBalance", this.balance);
  }
}
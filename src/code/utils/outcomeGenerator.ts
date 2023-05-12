export class OutcomeGenerator{

  generate(modifier: number): number[][]{
    let result = [];

    for (var i = 0; i < 3; i++) {
      let row = [];
      for (let j =0; j < 5; j++) {
        let symbolValue = Math.floor(Math.random() * 5);
        row.push(symbolValue);
      }
      result.push(row);
    }
    if (modifier > 0)
    {
      const symbolValue = Math.floor(Math.random() * 5);
      for (var i = 0; i < modifier; i++)
      {
        const randomRow = Math.floor(Math.random() * 2);
        let row = result[randomRow];
        let randomSymbol = Math.floor(Math.random() * 4);
        row[randomSymbol] = symbolValue;
      }
    }
    return result;
  }
}
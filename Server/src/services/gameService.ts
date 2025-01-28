type GridState = string[][];

export class GameService {
  private static gridState: GridState = Array.from({ length: 10 }, () => Array(10).fill(''));
  private static onlinePlayers: number = 0;

  static getGridState() {
    return this.gridState;
  }

  static updateBlock(row: number, col: number, char: string): GridState {
    if (!this.gridState[row][col]) {
      this.gridState[row][col] = char;
    }
    return this.gridState;
  }

  static increasePlayerCount() {
    // console.log("this: ", this)
    this.onlinePlayers++;
  }

  static decreasePlayerCount() {
    this.onlinePlayers--;
  }

  static getOnlinePlayers() {
    return this.onlinePlayers;
  }
}

/**
 * Class used to represent a Rubik's Cube using numbers.
 * 
 * The cube is represented in a "state-based" approach, where each sticker of the cube is a singular number inside an array. Due to this, is possible to track each individual sticker by its value. For example, we can get the original face (or color) of a sticker by doing:
 * - `Math.floor(sticker / 9);`, which returns a number between 0 and 5, representing one of the six faces.
 *
 * 
 * Below we have a reference scheme for the stickers arrangement in the solved position:
 * ```
 * ===================
 *       U            |
 *                    |
 *  L    F    R    B  |
 *                    |
 *       D            |
 * ===================
 * 
 *           00 01 02
 *           03 04 05
 *           06 07 08
 * 
 * 36 37 38  18 19 20  09 10 11  45 46 47
 * 39 40 41  21 22 23  12 13 14  48 49 50
 * 42 43 44  24 25 26  15 16 17  51 52 53
 * 
 *           27 28 29
 *           30 31 32
 *           33 34 35
 * ```
 * 
 * TODO: consider update the functions to return a new/current instance itself.
 */
class Cube {

  /**
   * The actual current cube stickers state, represented by numbers.
   */
  state: Array<number> = [];

  /**
   * Auxiliary number-to-string map to retrieve faces names based on index properly.
   */
  faces = ['U', 'R', 'F', 'D', 'L', 'B'];

  /**
   * Target indexes that should be permuted to represent a "U move".
   */
  U_Move: Array<number> = [
    6, 3, 0, 7, 4, 1, 8, 5, 2, 45, 46, 47, 12, 13, 14, 15, 16, 17, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 18, 19, 20, 39, 40, 41, 42, 43, 44, 36, 37, 38, 48, 49, 50, 51, 52, 53
  ];

  /**
   * Target indexes that should be permuted to represent a "R move".
   */
  R_Move: Array<number> = [
    0, 1, 20, 3, 4, 23, 6, 7, 26, 15, 12, 9, 16, 13, 10, 17, 14, 11,
    18, 19, 29, 21, 22, 32, 24, 25, 35, 27, 28, 51, 30, 31, 48, 33, 34, 45, 36, 37, 38, 39, 40, 41, 42, 43, 44, 8, 46, 47, 5, 49, 50, 2, 52, 53
  ];

  /**
   * Target indexes that should be permuted to represent a "F move".
   */
  F_Move: Array<number> = [
    0, 1, 2, 3, 4, 5, 44, 41, 38, 6, 10, 11, 7, 13, 14, 8, 16, 17, 24, 21, 18, 25, 22, 19, 26, 23, 20, 15, 12, 9, 30, 31, 32, 33, 34, 35, 36, 37, 27, 39, 40, 28, 42, 43, 29, 45, 46, 47, 48, 49, 50, 51, 52, 53
  ];

  /**
   * Target indexes that should be permuted to represent a "D move".
   */
  D_Move: Array<number> = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 24, 25, 26, 18, 19, 20, 21, 22, 23, 42, 43, 44, 33, 30, 27, 34, 31, 28, 35, 32, 29, 36, 37, 38, 39, 40, 41, 51, 52, 53, 45, 46, 47, 48, 49, 50, 15, 16, 17
  ];

  /**
   * Target indexes that should be permuted to represent a "L move".
   */
  L_Move: Array<number> = [
    53, 1, 2, 50, 4, 5, 47, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 19, 20, 3, 22, 23, 6, 25, 26, 18, 28, 29, 21, 31, 32, 24, 34, 35, 42, 39, 36, 43, 40, 37, 44, 41, 38, 45, 46, 33, 48, 49, 30, 51, 52, 27
  ];

  /**
   * Target indexes that should be permuted to represent a "B move".
   */
  B_Move: Array<number> = [
    11, 14, 17, 3, 4, 5, 6, 7, 8, 9, 10, 35, 12, 13, 34, 15, 16, 33, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 36, 39, 42, 2, 37, 38, 1, 40, 41, 0, 43, 44, 51, 48, 45, 52, 49, 46, 53, 50, 47
  ];

  /**
   * Setup a solved cube where each sticker is a singular number, going from 0 to 53.
   */
  constructor() {
    for (let i = 0; i < 6 * 9; i++) {
      this.state.push(i);
    }
  }

  /**
   * Applies a sequence of moves (in their string sign) onto the state of this cube.
   * The string moves names are mapped to the actual index maps of this cube.
   * @param sequence a Rubik's cube movements sequence in the standard pattern.
   */
  applySequence(sequence: string) {
    // TODO: perform other additional sanitization
    const moveNames: string[] = sequence
      .replace(/'/g, "!!")
      .split(" ");

    for (const move of moveNames) {
      let nextIndexMap: Array<number>;

      switch (move[0]) {
        case 'U': nextIndexMap = this.U_Move; break;
        case 'R': nextIndexMap = this.R_Move; break;
        case 'F': nextIndexMap = this.F_Move; break;
        case 'D': nextIndexMap = this.D_Move; break;
        case 'L': nextIndexMap = this.L_Move; break;
        case 'B': nextIndexMap = this.B_Move; break;
        default: nextIndexMap = this.state; break;
      }

      // multiplies the same map based on move length
      for (let i = 0; i < move.length; i++) {
        this.multiplyState(nextIndexMap);
      }
    }
  }

  /**
   * Multiplies the current state array with the passed movement indexes map and updates the current state based on result.
   * @param moveMap array of numbers containing the indexes that should be permuted in the original state.
   */
  multiplyState(moveMap: Array<number>) {
    let nextState: Array<number> = []; // consider moving outside to prevent re-allocations?
    for (let i = 0; i < 6 * 9; i++)
      nextState.push(this.state[moveMap[i]]);
    this.state = nextState;
  }

  /**
   * Basic method to check if this cube state is in the solved state.
   * @returns `true` if the cube is solved, otherwise, returns `false`.
   */
  isSolved() {
    return this.state.join(" ") === "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53";
  }

  /**
   * Debugs this cube state in the console.
   */
  debug() {
    let res = "";
    for (let f = 0; f < 6; f++) {
      res += `Face ${this.faces[f]}:\n`;
      for (let s = 1; s < 10; s++) {
        const nextValue = this.state[f * 9 + (s - 1)];
        res += `${nextValue} `.padStart(3, '0');
        if (s % 3 == 0) res += "\n";
      }
      res += "\n";
    }
    console.log(res);
  }
}


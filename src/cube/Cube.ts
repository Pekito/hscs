import { NUMBER_OF_STICKERS_ON_CUBE, STICKERS_ON_FACE} from "./Constants";
import { RubiksCube, RubiksCubeMove, RubiksCubeFace } from "./Types";

/**
 *
 * The cube is represented in a "state-based" approach, where each sticker of the cube is a singular number inside an array. Due to this, is possible to track each individual sticker by its value. For example, we can get the original face (or color) of a sticker by doing:
 * - `Math.floor(sticker / 9);`, which returns a number between 0 and 5, representing one of the six faces.
 *
 *
 * Below we have a reference scheme for the stickers arrangement in the solved position:
 *
 * U L F R B D
 *
 * ```
 * ===============================
 *          U(0)                  |
 *                                |
 *  L(1)    F(2)    R(3)    B(4)  |
 *                                |
 *          D(5)                  |
 * ===============================
 *
 *           00 01 02
 *           03 04 05
 *           06 07 08
 *
 * 09 10 11  18 19 20  27 28 29  36 37 38
 * 12 13 14  21 22 23  30 31 32  39 40 41
 * 15 16 17  24 25 26  33 34 35  42 43 44
 *
 *           45 46 47
 *           48 49 50
 *           51 52 53
 * ```
 *
 */


export const createCube = (): RubiksCube =>  Array.from({ length: NUMBER_OF_STICKERS_ON_CUBE }, (_, i) => i);
export const moveCube = (cube: RubiksCube, move: RubiksCubeMove): RubiksCube => move.map((moveIndex) => cube[moveIndex]);
export const getLayerStartIndex = (faceIndex: number) => faceIndex * STICKERS_ON_FACE;
export const getLayerEndIndex = (faceIndex: number) => getLayerStartIndex(faceIndex) + STICKERS_ON_FACE;
export const getFace = (faceIndex: number, cube: RubiksCube): RubiksCubeFace => cube.slice(getLayerStartIndex(faceIndex), getLayerEndIndex(faceIndex));
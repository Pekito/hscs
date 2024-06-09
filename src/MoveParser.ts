import { RubiksCube } from "./RubiksCube";

export const moveByNotation = (cube: RubiksCube, moves: string) => {
    const moveCube = (move: string) => {
        switch (move) {
            case "R": return cube.rotateRightClockwise();
            case "R'": return cube.rotateRightCounterClockwise();
            case "R2": return cube.rotateRightTwice();
            case "U": return cube.rotateUpClockwise();
            case "U'": return cube.rotateUpCounterClockwise();
            case "U2": return cube.rotateUpTwice();
            case "L": return cube.rotateLeftClockwise();
            case "L'": return cube.rotateLeftCounterClockwise();
            case "L2": return cube.rotateLeftTwice();
            case "B": return cube.rotateBackClockwise();
            case "B'": return cube.rotateBackCounterClockwise();
            case "B2": return cube.rotateBackTwice();
            case "F": return cube.rotateFrontClockwise();
            case "F'": return cube.rotateFrontCounterClockwise();
            case "F2": return cube.rotateFrontTwice();
            case "D": return cube.rotateBottomClockwise();
            case "D'": return cube.rotateBottomCounterClockwise();
            case "D2": return cube.rotateBottomTwice();
            default: throw new Error(`Invalid Move: >${move}<`);
        }
    }
    const movesArray = moves.trim().split(" ");
    for(const move of movesArray) moveCube(move);
}
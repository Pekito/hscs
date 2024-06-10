import { describe, expect, test } from "vitest";
import { RubiksCube } from "../src/RubiksCube";
import { getEdge, isBottomCrossSolved, isEdgeSolved } from "../src/PieceAnalyzer";
describe("getEdge", () => {
    test("Should return edge with correct values", () => {
        const cube = new RubiksCube();
        expect(getEdge("UB", cube)).toEqual(["W","B"]);
        expect(getEdge("UR", cube)).toEqual(["W","R"]);
        expect(getEdge("UF", cube)).toEqual(["W","G"]);
        expect(getEdge("UL", cube)).toEqual(["W","O"]);

        expect(getEdge("LU", cube)).toEqual(["O","W"]);
        expect(getEdge("LF", cube)).toEqual(["O","G"]);
        expect(getEdge("LD", cube)).toEqual(["O","Y"]);
        expect(getEdge("LB", cube)).toEqual(["O","B"]);

        expect(getEdge("FU", cube)).toEqual(["G","W"]);
        expect(getEdge("FR", cube)).toEqual(["G","R"]);
        expect(getEdge("FD", cube)).toEqual(["G","Y"]);
        expect(getEdge("FL", cube)).toEqual(["G","O"]);

        expect(getEdge("RU", cube)).toEqual(["R","W"]);
        expect(getEdge("RB", cube)).toEqual(["R","B"]);
        expect(getEdge("RD", cube)).toEqual(["R","Y"]);
        expect(getEdge("RF", cube)).toEqual(["R","G"]);

        expect(getEdge("BU", cube)).toEqual(["B","W"]);
        expect(getEdge("BL", cube)).toEqual(["B","O"]);
        expect(getEdge("BD", cube)).toEqual(["B","Y"]);
        expect(getEdge("BR", cube)).toEqual(["B","R"]);

        expect(getEdge("DF", cube)).toEqual(["Y","G"]);
        expect(getEdge("DR", cube)).toEqual(["Y","R"]);
        expect(getEdge("DB", cube)).toEqual(["Y","B"]);
        expect(getEdge("DL", cube)).toEqual(["Y","O"]);
    })
})
describe("isEdgeSolved", () => {
    test("Should return false on piece that is not solved", () => {
        const cube = new RubiksCube();
        cube.rotateRightClockwise();
        expect(isEdgeSolved("FR", cube)).toEqual(false);
    });
    test("Should return false on that is oriented but not solved", () => {
        const cube = new RubiksCube();
        cube.rotateBottomClockwise();
        const result = isEdgeSolved("DF", cube);
        expect(result).toEqual(false);
    });
    test("Should return true on solved piece", () => {
        const cube = new RubiksCube();
        cube.rotateRightClockwise();
        cube.rotateUpClockwise();
        cube.rotateRightCounterClockwise();
        cube.rotateUpCounterClockwise();
        expect(isEdgeSolved("FU", cube)).toEqual(true);
    })
});

describe("isBottomCrossSolved", () => {
    test("Should return true on solved cross without any matching corner", () => {
        const cube = new RubiksCube();
        cube.rotateRightClockwise();
        cube.rotateUpClockwise();
        cube.rotateRightCounterClockwise();
    
        cube.rotateLeftCounterClockwise();
        cube.rotateUpClockwise();
        cube.rotateLeftClockwise();
    
        cube.rotateBackCounterClockwise();
        cube.rotateUpClockwise();
        cube.rotateBackClockwise();
    
        cube.rotateBackClockwise()
        cube.rotateUpCounterClockwise();
        cube.rotateBackCounterClockwise();
        expect(isBottomCrossSolved(cube)).toBe(true);
    });
    test("Should return false on unsolved cross", () => {
        const cube = new RubiksCube();
    
        cube.rotateRightCounterClockwise();
        const result = isBottomCrossSolved(cube)
        expect(result).toEqual(false);
    })
    test("Should return false on unsolved cross", () => {
        const cube = new RubiksCube();
    
        cube.rotateBottomClockwise();
        const result = isBottomCrossSolved(cube)
        expect(result).toEqual(false);
    });
})
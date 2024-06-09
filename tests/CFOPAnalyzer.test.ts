import { expect, test } from "vitest";
import { RubiksCube } from "../src/RubiksCube";
import { CFOPPositionAnalyzer } from "../src/CubeSolver";

test("Should return true on solved cross", () => {
    const cube = new RubiksCube();

    cube.rotateRightClockwise();
    cube.rotateUpClockwise();
    cube.rotateRightCounterClockwise();
    expect(CFOPPositionAnalyzer.isCrossSolved(cube)).toEqual(true);
});

test("Should return false on unsolved cross", () => {
    const cube = new RubiksCube();

    cube.rotateRightCounterClockwise();
    expect(CFOPPositionAnalyzer.isCrossSolved(cube)).toEqual(false);
})
test("Should return false on unsolved cross", () => {
    const cube = new RubiksCube();

    cube.rotateBottomClockwise();
    expect(CFOPPositionAnalyzer.isCrossSolved(cube)).toEqual(false);
})
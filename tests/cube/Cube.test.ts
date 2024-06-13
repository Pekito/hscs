import { describe, it, expect } from "vitest";
import {createCube, getFace, moveCube} from "../../src/cube/Cube";
import { B_LAYER_INDEX, D_LAYER_INDEX, F_LAYER_INDEX, L_LAYER_INDEX, R_LAYER_INDEX, U_LAYER_INDEX } from "../../src/cube/Constants";
import { R_CLOCKWISE_MOVE, B_CLOCKWISE_MOVE, F_DOUBLE_MOVE, U_CLOCKWISE_MOVE, R_DOUBLE_MOVE, D_CLOCKWISE_MOVE, U_DOUBLE_MOVE, B_DOUBLE_MOVE, U_COUNTER_CLOCKWISE_MOVE, F_CLOCKWISE_MOVE, D_COUNTER_CLOCKWISE_MOVE, B_COUNTER_CLOCKWISE_MOVE, Z_CLOCKWISE_MOVE, Z_COUNTER_CLOCKWISE_MOVE, X_CLOCKWISE_MOVE, X_COUNTER_CLOCKWISE_MOVE, Y_CLOCKWISE_MOVE, Y_COUNTER_CLOCKWISE_MOVE, L_CLOCKWISE_MOVE, Z_DOUBLE_MOVE, X_DOUBLE_MOVE, Y_DOUBLE_MOVE } from "../../src/cube/Moves";

describe("getFace", () => {
    const makeResult = (startingIndex: number) => Array.from({length: 9}, (_, i) => startingIndex + i);
    const solvedCube = createCube();
    it("Should return from 0 to 8 if selected face is U", () => {
        expect(getFace(U_LAYER_INDEX, solvedCube)).toEqual(makeResult(0))
    });
    it("Should return from 9 to 17 if selected face is L", () => {
        expect(getFace(L_LAYER_INDEX, solvedCube)).toEqual(makeResult(9))
    });
    it("Should return from 18 to 26 if selected face is F", () => {
        expect(getFace(F_LAYER_INDEX, solvedCube)).toEqual(makeResult(18))
    });
    it("Should return from 27 to 35 if selected face is R", () => {
        expect(getFace(R_LAYER_INDEX, solvedCube)).toEqual(makeResult(27))
    });
    it("Should return from 36 to 44 if selected face is B", () => {
        expect(getFace(B_LAYER_INDEX, solvedCube)).toEqual(makeResult(36))
    });
    it("Should return from 45 to 53 if selected face is D", () => {
        expect(getFace(D_LAYER_INDEX, solvedCube)).toEqual(makeResult(45))
    });
});

describe("moveCube", () => {
    it("Should scramble the cube correctly", () => {
        const scrambledCube = moveCube(
            moveCube(
                moveCube(
                    moveCube(
                        moveCube(
                            moveCube(
                                moveCube(
                                    moveCube(
                                        moveCube(
                                            moveCube(
                                                moveCube(
                                                    moveCube(
                                                        moveCube(
                                                            moveCube(
                                                                moveCube(
                                                                    moveCube(
                                                                        moveCube(
                                                                            moveCube(
                                                                                moveCube(
                                                                                    moveCube(
                                                                                        createCube(),
                                                                                        R_CLOCKWISE_MOVE
                                                                                    ),
                                                                                    B_CLOCKWISE_MOVE
                                                                                ),
                                                                                F_DOUBLE_MOVE
                                                                            ),
                                                                            U_CLOCKWISE_MOVE
                                                                        ),
                                                                        R_DOUBLE_MOVE
                                                                    ),
                                                                    F_DOUBLE_MOVE
                                                                ),
                                                                R_DOUBLE_MOVE
                                                            ),
                                                            D_CLOCKWISE_MOVE
                                                        ),
                                                        U_DOUBLE_MOVE
                                                    ),
                                                    B_DOUBLE_MOVE
                                                ),
                                                D_CLOCKWISE_MOVE
                                            ),
                                            R_DOUBLE_MOVE
                                        ),
                                        B_DOUBLE_MOVE
                                    ),
                                    U_COUNTER_CLOCKWISE_MOVE
                                ),
                                R_CLOCKWISE_MOVE
                            ),
                            F_CLOCKWISE_MOVE
                        ),
                        D_COUNTER_CLOCKWISE_MOVE
                    ),
                    B_COUNTER_CLOCKWISE_MOVE
                ),
                R_DOUBLE_MOVE
            ),
            B_COUNTER_CLOCKWISE_MOVE
        );
    
        expect(scrambledCube).toEqual([
            9,  7, 18, 23,  4, 39, 20, 52, 17, 38, 30, 27,
           10, 13, 12, 35, 46, 26,  8, 43, 45, 41, 22, 16,
           33, 34, 36, 24, 32,  6, 48, 31, 14, 29,  1, 51,
           11, 19,  0, 21, 40,  3, 44,  5, 53, 47, 50,  2,
           25, 49, 37, 42, 28, 15
         ])
    });
    it("Should z rotate properly", () => {
        const uMovedCube = moveCube(createCube(), U_CLOCKWISE_MOVE);
        const uRotatedCube = moveCube(moveCube(moveCube(createCube(), Z_CLOCKWISE_MOVE), R_CLOCKWISE_MOVE), Z_COUNTER_CLOCKWISE_MOVE);
        expect(uMovedCube).toEqual(uRotatedCube);
    });
    it("Should z2 rotate properly", () => {
        const uMovedCube = moveCube(createCube(), U_CLOCKWISE_MOVE);
        const uRotatedCube = moveCube(moveCube(moveCube(createCube(), Z_DOUBLE_MOVE), D_CLOCKWISE_MOVE), Z_DOUBLE_MOVE);
        expect(uMovedCube).toEqual(uRotatedCube);
    });

    it("Should x rotate properly", () => {
        const uMovedCube = moveCube(createCube(), U_CLOCKWISE_MOVE);
        const uRotatedCube = moveCube(moveCube(moveCube(createCube(), X_CLOCKWISE_MOVE), B_CLOCKWISE_MOVE), X_COUNTER_CLOCKWISE_MOVE);
        expect(uMovedCube).toEqual(uRotatedCube);
    });

    it("Should x2 rotate properly", () => {
        const uMovedCube = moveCube(createCube(), U_CLOCKWISE_MOVE);
        const uRotatedCube = moveCube(moveCube(moveCube(createCube(), X_DOUBLE_MOVE), D_CLOCKWISE_MOVE), X_DOUBLE_MOVE);
        expect(uMovedCube).toEqual(uRotatedCube);
    });
    it("Should y rotate properly", () => {
        const fMovedCube = moveCube(createCube(), F_CLOCKWISE_MOVE);
        const yRotatedCube = moveCube(moveCube(moveCube(createCube(), Y_CLOCKWISE_MOVE), L_CLOCKWISE_MOVE), Y_COUNTER_CLOCKWISE_MOVE);
        expect(fMovedCube).toEqual(yRotatedCube);
    });

    it("Should y2 rotate properly", () => {
        const fMovedCube = moveCube(createCube(), F_CLOCKWISE_MOVE);
        const yRotatedCube = moveCube(moveCube(moveCube(createCube(), Y_DOUBLE_MOVE), B_CLOCKWISE_MOVE), Y_DOUBLE_MOVE);
        expect(fMovedCube).toEqual(yRotatedCube);
    });
});

import { describe, it, expect } from "vitest";
import {
  areMovesMirrored,
  D_CLOCKWISE_MOVE,
  D_COUNTER_CLOCKWISE_MOVE,
  mirrorSequenceInXAxis,
  mirrorSequenceInZAxis,
  R_CLOCKWISE_MOVE,
  R_COUNTER_CLOCKWISE_MOVE,
  reverseMove,
  reverseSequence,
  U_CLOCKWISE_MOVE,
  U_COUNTER_CLOCKWISE_MOVE,
  U_DOUBLE_MOVE,
} from "../../src/cube/moves";
import { areArraysEqual } from "../../src/Utils";
import {
  getNotationFromMove,
  parseNotationSequenceToMoveSequence,
} from "../../src/cube/Notation";

describe("areMovesMirrored", () => {
  it("Should return true", () => {
    expect(
      areMovesMirrored(U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE)
    ).toEqual(true);
    expect(areMovesMirrored(U_DOUBLE_MOVE, U_DOUBLE_MOVE)).toEqual(true);
  });
  it("Should return false", () => {
    expect(areMovesMirrored(U_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE)).toEqual(false);
    expect(areMovesMirrored(U_CLOCKWISE_MOVE, R_CLOCKWISE_MOVE)).toEqual(false);
    expect(
      areMovesMirrored(U_COUNTER_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE)
    ).toEqual(false);
    expect(
      areMovesMirrored(U_COUNTER_CLOCKWISE_MOVE, R_CLOCKWISE_MOVE)
    ).toEqual(false);
    expect(areMovesMirrored(U_DOUBLE_MOVE, U_CLOCKWISE_MOVE)).toEqual(false);
    expect(areMovesMirrored(U_DOUBLE_MOVE, U_COUNTER_CLOCKWISE_MOVE)).toEqual(
      false
    );
    expect(areMovesMirrored(U_DOUBLE_MOVE, R_CLOCKWISE_MOVE)).toEqual(false);
  });
});
describe("mirrorMove", () => {
  it("Should mirror a clockwise quarter move correctly", () => {
    const reversedUClockwise = reverseMove(U_CLOCKWISE_MOVE);
    expect(
      areArraysEqual(U_COUNTER_CLOCKWISE_MOVE, reversedUClockwise)
    ).toEqual(true);
  });
  it("Should mirror a counter clockwise quarter move correctly", () => {
    const reversedUCounterClockwise = reverseMove(U_COUNTER_CLOCKWISE_MOVE);
    expect(areArraysEqual(U_CLOCKWISE_MOVE, reversedUCounterClockwise)).toEqual(
      true
    );
  });
  it("Should mirror a double move correctly", () => {
    const targetMove = U_DOUBLE_MOVE;
    const uDoubleMirrored = reverseMove(U_DOUBLE_MOVE);
    console.log(
      getNotationFromMove(targetMove),
      getNotationFromMove(uDoubleMirrored)
    );
    expect(areArraysEqual(targetMove, U_DOUBLE_MOVE)).toEqual(true);
  });
});

describe("reverseSequence", () => {
  it("Should reverse a sequence", () => {
    const sequence = [
      R_CLOCKWISE_MOVE,
      U_CLOCKWISE_MOVE,
      D_COUNTER_CLOCKWISE_MOVE,
    ];
    const expected = [
      D_CLOCKWISE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      R_COUNTER_CLOCKWISE_MOVE,
    ];
    const reversedSequence = reverseSequence(sequence);
    expect(expected).toEqual(reversedSequence);
  });
});

describe("mirroring", () => {
  const pescaR = "R U R'";
  const pescaFR = "F' U' F";
  const pescaBR = "B U B'";

  describe("X Axis (R | L)", () => {
    it("Should mirror pesca R", () => {
      const pescaL = "L' U' L";
      expect(
        mirrorSequenceInXAxis(parseNotationSequenceToMoveSequence(pescaR))
      ).toEqual(parseNotationSequenceToMoveSequence(pescaL));
    });
    it("Should mirror pesca FR", () => {
      const pescaFL = "F U F'";
      expect(
        mirrorSequenceInXAxis(parseNotationSequenceToMoveSequence(pescaFR))
      ).toEqual(parseNotationSequenceToMoveSequence(pescaFL));
    });
    it("Should mirror pesca BR", () => {
      const pescaBL = "B' U' B";
      expect(
        mirrorSequenceInXAxis(parseNotationSequenceToMoveSequence(pescaBR))
      ).toEqual(parseNotationSequenceToMoveSequence(pescaBL));
    });
  });
  describe("Z Axis (F | B", () => {
    it("Should mirror pesca R", () => {
        const pescaBR = "R' U' R";
        expect(
          mirrorSequenceInZAxis(parseNotationSequenceToMoveSequence(pescaR))
        ).toEqual(parseNotationSequenceToMoveSequence(pescaBR));
      });
      it("Should mirror pesca FR", () => {
        const pescaBBR = "B U B'";
        expect(
            mirrorSequenceInZAxis(parseNotationSequenceToMoveSequence(pescaFR))
        ).toEqual(parseNotationSequenceToMoveSequence(pescaBBR));
      });
      it("Should mirror pesca BL", () => {
        const pescaBL = "B' U' B";
        const pescaFL = "F U F'";
        expect(
            mirrorSequenceInZAxis(parseNotationSequenceToMoveSequence(pescaBL))
        ).toEqual(parseNotationSequenceToMoveSequence(pescaFL));
      });
  })
});

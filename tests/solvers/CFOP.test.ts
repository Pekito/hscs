import { describe, it, expect } from "vitest";
import { mapNotationSequenceToMoveSequence } from "../../src/cube/Notation";
import { createCubeState } from "../../src/cube/Cube";
import CFOP from "../../src/solvers/CFOP";
import { F2L_FR_BLOCKED_BL_STATES_TABLE, F2L_FR_BLOCKED_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_BL_STATES_TABLE, F2L_FR_BLOCKED_FL_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_STATES_TABLE, F2L_FR_FREE_SLOTS_STATES_TABLE, F2L_FR_NO_FREE_SLOTS_TABLE } from "../../src/db/constants";

describe("getUnsolvedF2LTable", () => {
    it("Should return free slots", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' L' U L L U' L' R' U R"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_FREE_SLOTS_STATES_TABLE);
    });
    it("Should return no free slots", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R'"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_NO_FREE_SLOTS_TABLE);
    });
    it("Should return FL blocked", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' R' U R L U L'"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_BLOCKED_FL_STATES_TABLE);
    });
    it("Should return BL blocked", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' L' U L R' U R"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_BLOCKED_BL_STATES_TABLE);
    });
    it("Should return BR blocked", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' L' U L L U L'"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_BLOCKED_BR_STATES_TABLE);
    });
    it("Should return FL BL blocked", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' R' U R"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_BLOCKED_FL_BL_STATES_TABLE);
    });
    it("Should return FL BR blocked", () => {
        const freeSlots = createCubeState(mapNotationSequenceToMoveSequence("R U R' L U L'"));
        expect(CFOP.getUnsolvedF2LTable(CFOP.createF2LState(freeSlots))).toEqual(F2L_FR_BLOCKED_FL_BR_STATES_TABLE);
    });
})
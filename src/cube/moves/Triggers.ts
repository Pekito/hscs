import { mapNotationSequenceToMoveSequence } from "../Notation";
import { R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE } from "./LayerMoves";
import { reverseSequence } from "./Utils";

export const PESCA = mapNotationSequenceToMoveSequence("R U R'");
export const INSERCAO = reverseSequence(PESCA);
export const MEIA_LUA = mapNotationSequenceToMoveSequence("R U2 R' U2");
export const SLEDGE = mapNotationSequenceToMoveSequence("R' F R F'");
export const SEXY_MOVE = mapNotationSequenceToMoveSequence("R U R' U'");
export const HEDGE = reverseSequence(SLEDGE);
export const SUNE = mapNotationSequenceToMoveSequence("R U R' U R U2 R'");
export const ANTISUNE = reverseSequence(SUNE);
export const JBPerm = mapNotationSequenceToMoveSequence("R U R' F' R U R' U' R' F R2 U' R' U'");
export const UaPerm = mapNotationSequenceToMoveSequence("M2 U M U2 M' U M2");
export const UbPerm = mapNotationSequenceToMoveSequence("M2 U' M U2 M' U' M2");
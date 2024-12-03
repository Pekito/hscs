import { parseNotationSequenceToMoveSequence } from "../Notation";
import { R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE } from "./LayerMoves";
import { reverseSequence } from "./Utils";

export const PESCA = parseNotationSequenceToMoveSequence("R U R'");
export const INSERCAO = reverseSequence(PESCA);
export const MEIA_LUA = parseNotationSequenceToMoveSequence("R U2 R' U2");
export const SLEDGE = parseNotationSequenceToMoveSequence("R' F R F'");
export const SEXY_MOVE = parseNotationSequenceToMoveSequence("R U R' U'");
export const HEDGE = reverseSequence(SLEDGE);
export const SUNE = parseNotationSequenceToMoveSequence("R U R' U R U2 R'");
export const ANTISUNE = reverseSequence(SUNE);
export const JBPerm = parseNotationSequenceToMoveSequence("R U R' F' R U R' U' R' F R2 U' R' U'");
export const UaPerm = parseNotationSequenceToMoveSequence("M2 U M U2 M' U M2");
export const UbPerm = parseNotationSequenceToMoveSequence("M2 U' M U2 M' U' M2");
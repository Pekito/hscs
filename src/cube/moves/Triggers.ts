import { mapNotationSequenceToMoveSequence } from "../Notation";
import { U_CLOCKWISE_MOVE } from "./LayerMoves";
import { reverseSequence } from "./Utils";

export const PESCA = mapNotationSequenceToMoveSequence("R U R'");
export const INSERCAO = reverseSequence(PESCA);
export const MEIA_LUA = mapNotationSequenceToMoveSequence("R U2 R' U2");
export const SLEDGE = mapNotationSequenceToMoveSequence("R' F R F'");
export const SEXY_MOVE = mapNotationSequenceToMoveSequence("R U R' U'");
export const HEDGE = reverseSequence(SLEDGE);
export const SUNE = [...PESCA, U_CLOCKWISE_MOVE, ...MEIA_LUA];
export const ANTISUNE = reverseSequence(SUNE);
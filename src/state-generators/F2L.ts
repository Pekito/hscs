import { Console } from "console";
import { createCube, createCubeState } from "../cube/Cube";
import {
  F_CLOCKWISE_MOVE,
  F_COUNTER_CLOCKWISE_MOVE,
  getAllSequenceMirrors,
  LAYER_MOVES_ARRAY,
  mirrorMoveInXAxis,
  mirrorMoveInZAxis,
  mirrorSequenceInXAxis,
  mirrorSequenceInZXAxis,
  mirrorSequenceInZAxis,
  R_CLOCKWISE_MOVE,
  R_COUNTER_CLOCKWISE_MOVE,
  reverseSequence,
  U_CLOCKWISE_MOVE,
  U_COUNTER_CLOCKWISE_MOVE,
  U_DOUBLE_MOVE,
} from "../cube/moves";
import {
  mapMoveArrayToNotation,
  parseNotationSequenceToMoveSequence,
} from "../cube/Notation";
import { MoveSequence, RubiksCube } from "../cube/Types";
import { StateHashTableKeyCreator } from "../solvers/DataStructures";
import { findStatesWithOptimalSolution } from "../solvers/Finders";
import { iterativeDepthFirstSearchSolution } from "../solvers/SearchAlgorithms";
import { print2DCube, printWCACube } from "../visualizers/PrintCube";
import { getSolvedCubeOrientation, SOLVED_STATES_TABLE } from "./SolvedState";
import { joinMovesByArrows, joinMovesBySpaces } from "../visualizers/PrintMove";

export const createFrontRightF2LStateKey: StateHashTableKeyCreator = (
  cube: RubiksCube
) => {
  const orientation = getSolvedCubeOrientation(cube);
  const indexes = [23, 26].map((index) =>
    cube.findIndex((sticker) => sticker === orientation[index])
  );
  return indexes.join(",");
};
const pesca = [R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE];
const insercao = [
  R_CLOCKWISE_MOVE,
  U_COUNTER_CLOCKWISE_MOVE,
  R_COUNTER_CLOCKWISE_MOVE,
];
const pescaF = [F_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, F_CLOCKWISE_MOVE];
const insercaoF = [
  F_COUNTER_CLOCKWISE_MOVE,
  U_COUNTER_CLOCKWISE_MOVE,
  F_CLOCKWISE_MOVE,
];
const meiaLuaR = [R_CLOCKWISE_MOVE, U_DOUBLE_MOVE, R_COUNTER_CLOCKWISE_MOVE];
const meiaLuaF = [F_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE, F_CLOCKWISE_MOVE];

const todasPescas = getAllSequenceMirrors(pesca);
const todasInsercoes = getAllSequenceMirrors(insercao);
const todasPescasF = getAllSequenceMirrors(pescaF);
const todasInsercoesF = getAllSequenceMirrors(insercaoF);
const todasMeiaLuaR = getAllSequenceMirrors(meiaLuaR);
const todasMeiaLuaF = getAllSequenceMirrors(meiaLuaF);
export const FRONT_RIGHT_F2L_FREE_SLOT_STATES = () =>
  findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...todasPescas,
      ...todasInsercoes,
      ...todasPescasF,
      ...todasInsercoesF,
      ...todasMeiaLuaF,
      ...todasMeiaLuaR,
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
export const FRONT_RIGHT_F2L_FL_SOLVED_STATES = () => {
  const getAvailableSequences = (sequence: MoveSequence) => {
    return [
      sequence,
      mirrorSequenceInZAxis(sequence),
      mirrorSequenceInZXAxis(sequence),
    ];
  };

  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...getAvailableSequences(pesca),
      ...getAvailableSequences(pescaF),
      ...getAvailableSequences(insercao),
      ...getAvailableSequences(insercaoF),
      ...getAvailableSequences(meiaLuaR),
      ...getAvailableSequences(meiaLuaF),
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
};
export const FRONT_RIGHT_F2L_BL_SOLVED_STATES = () => {
  const getAvailableSequences = (sequence: MoveSequence) => {
    return [
      sequence,
      mirrorSequenceInZAxis(sequence),
      mirrorSequenceInXAxis(sequence),
    ];
  };

  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...getAvailableSequences(pesca),
      ...getAvailableSequences(pescaF),
      ...getAvailableSequences(insercao),
      ...getAvailableSequences(insercaoF),
      ...getAvailableSequences(meiaLuaR),
      ...getAvailableSequences(meiaLuaF),
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
};
export const FRONT_RIGHT_F2L_BR_SOLVED_STATES = () => {
  const getAvailableSequences = (sequence: MoveSequence) => {
    return [
      sequence,
      mirrorSequenceInZXAxis(sequence),
      mirrorSequenceInXAxis(sequence),
    ];
  };

  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...getAvailableSequences(pesca),
      ...getAvailableSequences(pescaF),
      ...getAvailableSequences(insercao),
      ...getAvailableSequences(insercaoF),
      ...getAvailableSequences(meiaLuaR),
      ...getAvailableSequences(meiaLuaF),
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
};
export const FRONT_RIGHT_F2L_FL_BL_SOLVED_STATES = () => {
    const getAvailableSequences = (sequence: MoveSequence) => {
      return [
        sequence,
        mirrorSequenceInZAxis(sequence),
      ];
    };
  
    return findStatesWithOptimalSolution({
      cubeStateNode: createCube(),
      maxDepth: 4,
      possibleMoves: [
        U_CLOCKWISE_MOVE,
        U_DOUBLE_MOVE,
        U_COUNTER_CLOCKWISE_MOVE,
        ...getAvailableSequences(pesca),
        ...getAvailableSequences(pescaF),
        ...getAvailableSequences(insercao),
        ...getAvailableSequences(insercaoF),
        ...getAvailableSequences(meiaLuaR),
        ...getAvailableSequences(meiaLuaF),
      ],
      stateKeyCreator: createFrontRightF2LStateKey,
    });
};
export const FRONT_RIGHT_F2L_NO_FREE_SLOT_STATES = () => {
  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      pesca,
      pescaF,
      insercao,
      insercaoF,
      meiaLuaR,
      meiaLuaF,
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
};
export const FRONT_RIGHT_F2L_BL_BR_SOLVED_STATES = () => {
  const getAvailableSequences = (sequence: MoveSequence) => {
    return [
      sequence,
      mirrorSequenceInXAxis(sequence),
    ];
  };

  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...getAvailableSequences(pesca),
      ...getAvailableSequences(pescaF),
      ...getAvailableSequences(insercao),
      ...getAvailableSequences(insercaoF),
      ...getAvailableSequences(meiaLuaR),
      ...getAvailableSequences(meiaLuaF),
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
}
export const FRONT_RIGHT_F2L_FL_BR_SOLVED_STATES = () => {
  const getAvailableSequences = (sequence: MoveSequence) => {
    return [
      sequence,
      mirrorSequenceInZXAxis(sequence),
    ];
  };

  return findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 4,
    possibleMoves: [
      U_CLOCKWISE_MOVE,
      U_DOUBLE_MOVE,
      U_COUNTER_CLOCKWISE_MOVE,
      ...getAvailableSequences(pesca),
      ...getAvailableSequences(pescaF),
      ...getAvailableSequences(insercao),
      ...getAvailableSequences(insercaoF),
      ...getAvailableSequences(meiaLuaR),
      ...getAvailableSequences(meiaLuaF),
    ],
    stateKeyCreator: createFrontRightF2LStateKey,
  });
}
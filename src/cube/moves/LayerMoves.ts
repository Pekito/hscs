import { createCube } from "../Cube";
import { RubiksCubeMove, RubiksCubeLayerMoveGroup } from "../Types";

export const UNCHANGED_MOVE: RubiksCubeMove = createCube();

export const U_CLOCKWISE_MOVE: RubiksCubeMove = [
    6, 3, 0, //U
    7, 4, 1, 
    8, 5, 2,

    18,19,20, // L
    12,13,14,
    15,16,17,

    27,28,29, // F
    21,22,23,
    24,25,26,

    36,37,38, // R
    30,31,32,
    33,34,35,

    9,10,11, // B
    39,40,41,
    42,43,44,

    45,46,47, // D
    48,49,50,
    51,52,53
];
export const U_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    2, 5, 8, //U
    1, 4, 7, 
    0, 3, 6,

    36, 37, 38, // L
    12, 13, 14,
    15, 16, 17,

    9, 10, 11, // F
    21, 22, 23,
    24, 25, 26,

    18, 19, 20, // R
    30, 31, 32,
    33, 34, 35,

    27, 28, 29, // B
    39, 40, 41,
    42, 43, 44,

    45, 46, 47, // D
    48, 49, 50,
    51, 52, 53
];
export const U_DOUBLE_MOVE: RubiksCubeMove = [
    8, 7, 6, // U
    5, 4, 3, 
    2, 1, 0,

    27, 28, 29, // L
    12, 13, 14,
    15, 16, 17,

    36, 37, 38, // F
    21, 22, 23,
    24, 25, 26,

    9, 10, 11, // R
    30, 31, 32,
    33, 34, 35,

    18, 19, 20, // B
    39, 40, 41,
    42, 43, 44,

    45, 46, 47, // D
    48, 49, 50,
    51, 52, 53
];

export const L_CLOCKWISE_MOVE: RubiksCubeMove = [
    44, 1, 2, // U
    41, 4, 5, 
    38, 7, 8,

    15, 12, 9, // l
    16, 13, 10,
    17, 14, 11,

    0, 19, 20, // F
    3, 22, 23,
    6, 25, 26,

    27, 28, 29, // R
    30, 31, 32,
    33, 34, 35,

    36, 37, 51, // B
    39, 40, 48,
    42, 43, 45,

    18, 46, 47, // D
    21, 49, 50,
    24, 52, 53
];
export const L_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    18, 1, 2, // U
    21, 4, 5, 
    24, 7, 8,

    11, 14, 17, // L
    10, 13, 16,
    9, 12, 15,

    45, 19, 20, // F
    48, 22, 23,
    51, 25, 26,

    27, 28, 29, // R
    30, 31, 32,
    33, 34, 35,

    36, 37, 6, // B
    39, 40, 3,
    42, 43, 0,

    44, 46, 47, // D
    41, 49, 50,
    38, 52, 53
];
export const L_DOUBLE_MOVE: RubiksCubeMove = [
    45, 1, 2, // U
    48, 4, 5, 
    51, 7, 8,

    17, 16, 15, // L
    14, 13, 12,
    11, 10, 9,

    44, 19, 20, // F
    41, 22, 23,
    38, 25, 26,

    27, 28, 29, // R
    30, 31, 32,
    33, 34, 35,

    36, 37, 24, // B
    39, 40, 21,
    42, 43, 18,

    0, 46, 47, // D
    3, 49, 50,
    6, 52, 53
];

export const F_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    17, 14, 11,

    9, 10, 45, // L
    12, 13, 46,
    15, 16, 47,

    24, 21, 18, // F
    25, 22, 19,
    26, 23, 20,

    6, 28, 29, // R
    7, 31, 32,
    8, 34, 35,

    36, 37, 38, // B
    39, 40, 41,
    42, 43, 44,

    33, 30, 27, // D
    48, 49, 50,
    51, 52, 53
];
export const F_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    27, 30, 33,

    9, 10, 8, // L
    12, 13, 7,
    15, 16, 6,

    20, 23, 26, // F
    19, 22, 25,
    18, 21, 24,

    47, 28, 29, // R
    46, 31, 32,
    45, 34, 35,

    36, 37, 38, // B
    39, 40, 41,
    42, 43, 44,

    11, 14, 17, // D
    48, 49, 50,
    51, 52, 53
];
export const F_DOUBLE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    47, 46, 45,

    9, 10, 33, // L
    12, 13, 30,
    15, 16, 27,

    26, 25, 24, // F
    23, 22, 21,
    20, 19, 18,

    17, 28, 29, // R
    14, 31, 32,
    11, 34, 35,

    36, 37, 38, // B
    39, 40, 41,
    42, 43, 44,

    8, 7, 6, // D
    48, 49, 50,
    51, 52, 53
];

export const R_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 20, //U
    3, 4, 23, 
    6, 7, 26,

    9, 10, 11, // L
    12, 13, 14,
    15, 16, 17,

    18, 19, 47, // F
    21, 22, 50,
    24, 25, 53,

    33, 30, 27, // R
    34, 31, 28,
    35, 32, 29,
 
    8, 37, 38, // B
    5, 40, 41,
    2, 43, 44,
 
    45, 46, 42, // D
    48, 49, 39,
    51, 52, 36
];
export const R_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 42, // U
    3, 4, 39, 
    6, 7, 36,

    9, 10, 11, // L
    12, 13, 14,
    15, 16, 17,

    18, 19, 2, // F
    21, 22, 5,
    24, 25, 8,

    29, 32, 35, // R
    28, 31, 34,
    27, 30, 33,

    53 , 37, 38, // B
    50 , 40, 41,
    47 , 43, 44,

    45, 46, 20, // D
    48, 49, 23,
    51, 52, 26
];
export const R_DOUBLE_MOVE: RubiksCubeMove = [
    0, 1, 47, // U
    3, 4, 50, 
    6, 7, 53,

    9, 10, 11, // L
    12, 13, 14,
    15, 16, 17,

    18, 19, 42, // F
    21, 22, 39,
    24, 25, 36,

    35, 34, 33, // R
    32, 31, 30,
    29, 28, 27,

    26, 37, 38, // B
    23, 40, 41,
    20, 43, 44,

    45, 46, 2, // D
    48, 49, 5,
    51, 52, 8
];

export const B_CLOCKWISE_MOVE: RubiksCubeMove = [
    29, 32, 35, // U
    3, 4, 5, 
    6, 7, 8,

    2, 10, 11, // L
    1, 13, 14,
    0, 16, 17,

    18, 19, 20, // F
    21, 22, 23,
    24, 25, 26,

    27, 28, 53, // R
    30, 31, 52,
    33, 34, 51,

    42, 39, 36, // B
    43, 40, 37,
    44, 41, 38,

    45, 46, 47, // D
    48, 49, 50,
    9, 12, 15
];
export const B_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    15, 12, 9, // U
    3, 4, 5, 
    6, 7, 8,

    51, 10, 11, // L
    52, 13, 14,
    53, 16, 17,

    18, 19, 20, // F
    21, 22, 23,
    24, 25, 26,

    27, 28, 0, // R
    30, 31, 1,
    33, 34, 2,

    38, 41, 44, // B
    37, 40, 43,
    36, 39, 42,

    45, 46, 47, // D
    48, 49, 50,
    35, 32, 29
];
export const B_DOUBLE_MOVE: RubiksCubeMove = [
    53, 52, 51, // U
    3, 4, 5, 
    6, 7, 8,

    35, 10, 11, // L
    32, 13, 14,
    29, 16, 17,

    18, 19, 20, // F
    21, 22, 23,
    24, 25, 26,

    27, 28, 15, // R
    30, 31, 12,
    33, 34, 9,

    44, 43, 42, // B
    41, 40, 39,
    38, 37, 36,

    45, 46, 47, // D
    48, 49, 50,
    2, 1, 0
];

export const D_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    6, 7, 8,

    9, 10, 11, // L
    12, 13, 14,
    42, 43, 44,

    18, 19, 20, // F
    21, 22, 23,
    15, 16, 17,

    27, 28, 29, // R
    30, 31, 32,
    24, 25, 26,

    36, 37, 38, // B
    39, 40, 41,
    33, 34, 35,

    51, 48, 45, //D
    52, 49, 46,
    53, 50, 47,
];
export const D_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    6, 7, 8,

    9, 10, 11, // L
    12, 13, 14,
    24, 25, 26,

    18, 19, 20, // F
    21, 22, 23,
    33, 34, 35,

    27, 28, 29, // R
    30, 31, 32,
    42, 43, 44,

    36, 37, 38, // B
    39, 40, 41,
    15, 16, 17,

    47, 50, 53, //D
    46, 49, 52, 
    45, 48, 51
];
export const D_DOUBLE_MOVE: RubiksCubeMove = [
    0, 1, 2, // U
    3, 4, 5, 
    6, 7, 8,

    9, 10, 11, // L
    12, 13, 14,
    33, 34, 35,

    18, 19, 20, // F
    21, 22, 23,
    42, 43, 44,

    27, 28, 29, // R
    30, 31, 32,
    15, 16, 17,

    36, 37, 38, // B
    39, 40, 41,
    24, 25, 26,

    53, 52, 51, // D
    50, 49, 48,
    47, 46, 45
];
export const M_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 43,  2,  3, 40,  5,  6, 37,  8,  9, 10, 11,
   12, 13, 14, 15, 16, 17, 18,  1, 20, 21,  4, 23,
   24,  7, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
   36, 52, 38, 39, 49, 41, 42, 46, 44, 45, 19, 47,
   48, 22, 50, 51, 25, 53
 ];
export const M_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0, 19,  2,  3, 22,  5,  6, 25,  8,  9, 10, 11,
   12, 13, 14, 15, 16, 17, 18, 46, 20, 21, 49, 23,
   24, 52, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
   36,  7, 38, 39,  4, 41, 42,  1, 44, 45, 43, 47,
   48, 40, 50, 51, 37, 53
 ];
export const M_DOUBLE_MOVE: RubiksCubeMove = [
    0, 46,  2,  3, 49,  5,  6, 52,  8,  9, 10, 11,
   12, 13, 14, 15, 16, 17, 18, 43, 20, 21, 40, 23,
   24, 37, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
   36, 25, 38, 39, 22, 41, 42, 19, 44, 45,  1, 47,
   48,  4, 50, 51,  7, 53
 ]
export const S_CLOCKWISE_MOVE: RubiksCubeMove = [
   0,  1,  2, 16, 13, 10,  6,  7,  8,  9, 48, 11,
  12, 49, 14, 15, 50, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27,  3, 29, 30,  4, 32, 33,  5, 35,
  36, 37, 38, 39, 40, 41, 42, 43, 44, 47, 46, 45,
  34, 31, 28, 51, 52, 53
]
export const S_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0,  1,  2, 28, 31, 34,  6,  7,  8,  9,  5, 11,
   12,  4, 14, 15,  3, 17, 18, 19, 20, 21, 22, 23,
   24, 25, 26, 27, 50, 29, 30, 49, 32, 33, 48, 35,
   36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
   10, 13, 16, 51, 52, 53
]

export const S_DOUBLE_MOVE: RubiksCubeMove = [
    0,  1,  2, 50, 49, 48,  6,  7,  8,  9, 34, 11,
   12, 31, 14, 15, 28, 17, 18, 19, 20, 21, 22, 23,
   24, 25, 26, 27, 16, 29, 30, 13, 32, 33, 10, 35,
   36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
    5,  4,  3, 51, 52, 53
 ]
export const E_CLOCKWISE_MOVE: RubiksCubeMove = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
   39, 40, 41, 15, 16, 17, 18, 19, 20, 12, 13, 14,
   24, 25, 26, 27, 28, 29, 21, 22, 23, 33, 34, 35,
   36, 37, 38, 30, 31, 32, 42, 43, 44, 45, 46, 47,
   48, 49, 50, 51, 52, 53
 ]
export const E_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
   21, 22, 23, 15, 16, 17, 18, 19, 20, 30, 31, 32,
   24, 25, 26, 27, 28, 29, 39, 40, 41, 33, 34, 35,
   36, 37, 38, 12, 13, 14, 42, 43, 44, 45, 46, 47,
   48, 49, 50, 51, 52, 53
 ]
export const E_DOUBLE_MOVE: RubiksCubeMove = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
   30, 31, 32, 15, 16, 17, 18, 19, 20, 39, 40, 41,
   24, 25, 26, 27, 28, 29, 12, 13, 14, 33, 34, 35,
   36, 37, 38, 21, 22, 23, 42, 43, 44, 45, 46, 47,
   48, 49, 50, 51, 52, 53
 ];

export const LAYER_MOVES: Record<string, RubiksCubeLayerMoveGroup> = {
    U: {
        CLOCKWISE: U_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: U_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: U_DOUBLE_MOVE
    },
    L: {
        CLOCKWISE: L_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: L_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: L_DOUBLE_MOVE
    },
    F: {
        CLOCKWISE: F_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: F_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: F_DOUBLE_MOVE
    },
    R: {
        CLOCKWISE: R_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: R_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: R_DOUBLE_MOVE
    },
    B: {
        CLOCKWISE: B_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: B_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: B_DOUBLE_MOVE
    },
    D: {
        CLOCKWISE: D_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: D_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: D_DOUBLE_MOVE
    }
}
export const LAYER_MOVES_ARRAY = Object.values(LAYER_MOVES)
.flatMap(moveGroup => [
    moveGroup.CLOCKWISE,
    moveGroup.COUNTER_CLOCKWISE,
    moveGroup.DOUBLE
]);
export const QUARTER_TURN_LAYER_MOVES_ARRAY = Object.values(LAYER_MOVES)
.flatMap(moveGroup => [
    moveGroup.CLOCKWISE,
    moveGroup.COUNTER_CLOCKWISE
]);
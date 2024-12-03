import { RubiksCubeMove, RubiksCubeLayerMoveGroup } from "../Types";

export const X_CLOCKWISE_MOVE: RubiksCubeMove = [
    18, 19, 20, // U
    21, 22, 23,
    24, 25, 26,

    11, 14, 17, // L
    10, 13, 16,
    9, 12, 15,

    45, 46, 47, // F
    48, 49, 50,
    51, 52, 53,

    33, 30, 27, // R
    34, 31, 28,
    35, 32, 29,

    8, 7, 6, // B
    5, 4, 3,
    2, 1, 0,

    44, 43, 42, // D
    41, 40, 39,
    38, 37, 36,
];
export const X_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    44, 43, 42, // U
    41, 40, 39, 
    38, 37, 36,

    15, 12, 9, // l
    16, 13, 10,
    17, 14, 11,

    0, 1, 2, // F
    3, 4, 5,
    6, 7, 8,

    29, 32, 35, // R
    28, 31, 34,
    27, 30, 33,

    53, 52, 51, // B
    50, 49, 48,
    47, 46, 45,

    18, 19, 20, // D
    21, 22, 23,
    24, 25, 26,
];
export const X_DOUBLE_MOVE: RubiksCubeMove = [
    45, 46, 47, 48, 49, 50, 51, 52, 53, 17, 16, 15,
    14, 13, 12, 11, 10,  9, 44, 43, 42, 41, 40, 39,
    38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27,
    26, 25, 24, 23, 22, 21, 20, 19, 18,  0,  1,  2,
     3,  4,  5,  6,  7,  8
];
export const Y_CLOCKWISE_MOVE: RubiksCubeMove = [
    6, 3, 0, //U
    7, 4, 1, 
    8, 5, 2,

    18, 19, 20, // L
    21, 22, 23,
    24, 25, 26,

    27, 28, 29, // F
    30, 31, 32,
    33, 34, 35,

    36, 37, 38, // R
    39, 40, 41,
    42, 43, 44,

    9, 10, 11, // B
    12, 13, 14,
    15, 16, 17,

    47, 50, 53, //D
    46, 49, 52, 
    45, 48, 51
]

export const Y_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    2,  5,  8,  // U
    1,  4,  7,  
    0,  3,  6, 

    36, 37, 38, // L
    39, 40, 41, 
    42, 43, 44, 

    9, 10, 11, // F
    12, 13, 14,
    15, 16, 17,

    18, 19, 20, // R
    21, 22, 23, 
    24, 25, 26,

    27, 28, 29, // B
    30, 31, 32, 
    33, 34, 35, 

    51, 48, 45, // D
    52, 49, 46, 
    53, 50, 47
 ]
 
 export const Y_DOUBLE_MOVE: RubiksCubeMove = [
    8,  7,  6,  // U
    5,  4,  3,  
    2,  1,  0, 

    27, 28, 29, // L
    30, 31, 32, 
    33, 34, 35, 

    36, 37, 38, // F
    39, 40, 41,
    42, 43, 44, 

    9, 10, 11, // R
    12, 13, 14, 
    15, 16, 17,

    18, 19, 20, // B
    21, 22, 23, 
    24, 25, 26,

    53, 52, 51, // D
    50, 49, 48,
    47, 46, 45
 ]

export const Z_CLOCKWISE_MOVE: RubiksCubeMove = [
    15, 12, 9,
    16, 13, 10,
    17, 14, 11,

    51, 48, 45,
    52, 49, 46,
    53, 50, 47,

    24, 21, 18,
    25, 22, 19,
    26, 23 ,20,

    6, 3, 0,
    7, 4, 1,
    8, 5, 2,

    38, 41, 44,
    37, 40, 43,
    36, 39, 42,

    33, 30, 27,
    34, 31, 28,
    35, 32, 29

]   
export const Z_COUNTER_CLOCKWISE_MOVE: RubiksCubeMove = [
    29, 32, 35, 28, 31, 34, 27, 30, 33,  2,  5,  8,
     1,  4,  7,  0,  3,  6, 20, 23, 26, 19, 22, 25,
    18, 21, 24, 47, 50, 53, 46, 49, 52, 45, 48, 51,
    42, 39, 36, 43, 40, 37, 44, 41, 38, 11, 14, 17,
    10, 13, 16,  9, 12, 15
  ]

export const Z_DOUBLE_MOVE: RubiksCubeMove = [
    53, 52, 51, 50, 49, 48, 47, 46, 45, 35, 34, 33,
    32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,  9,
    44, 43, 42, 41, 40, 39, 38, 37, 36,  8,  7,  6,
     5,  4,  3,  2,  1,  0
  ]
export const AXIS_MOVES: Record<string, RubiksCubeLayerMoveGroup> = {
    X: {
        CLOCKWISE: X_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: X_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: X_DOUBLE_MOVE
    },
    Y: {
        CLOCKWISE: Y_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: Y_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: Y_DOUBLE_MOVE,
    },
    Z: {
        CLOCKWISE: Z_CLOCKWISE_MOVE,
        COUNTER_CLOCKWISE: Z_COUNTER_CLOCKWISE_MOVE,
        DOUBLE: Z_DOUBLE_MOVE,
    }
}

export const AXIS_MOVES_ARRAY = Object.values(AXIS_MOVES)
.flatMap(moveGroup => [
    moveGroup.CLOCKWISE,
    moveGroup.COUNTER_CLOCKWISE,
    moveGroup.DOUBLE
]);
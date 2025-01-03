export const U_LAYER_INDEX = 0;
export const L_LAYER_INDEX = 1;
export const F_LAYER_INDEX = 2;
export const R_LAYER_INDEX = 3;
export const B_LAYER_INDEX = 4;
export const D_LAYER_INDEX = 5;
export const NUMBER_OF_FACES = 6;
export const STICKERS_ON_FACE = 9; // nice!
export const CENTER_FACE_INDEX = Math.trunc(STICKERS_ON_FACE / 2);
export const NUMBER_OF_STICKERS_ON_CUBE = NUMBER_OF_FACES * STICKERS_ON_FACE;
export const TOP_EDGE_STICKER_INDEX = 1;
export const RIGHT_EDGE_STICKER_INDEX = 5;
export const BOTTOM_EDGE_STICKER_INDEX = 7;
export const LEFT_EDGE_STICKER_INDEX = 3;
export const EDGES_STICKER_INDEXES = [
    TOP_EDGE_STICKER_INDEX,
    RIGHT_EDGE_STICKER_INDEX,
    BOTTOM_EDGE_STICKER_INDEX,
    LEFT_EDGE_STICKER_INDEX
];
export const Y_AXIS_LAYERS = [
    L_LAYER_INDEX,
    F_LAYER_INDEX,
    R_LAYER_INDEX,
    B_LAYER_INDEX
]
export const Y_AXIS_BOTTOM_EDGE_STICKERS = Y_AXIS_LAYERS.map(layerIndex => (layerIndex * STICKERS_ON_FACE) + BOTTOM_EDGE_STICKER_INDEX);
export const FACE_INDEX_ARRAY = [
    U_LAYER_INDEX,
    L_LAYER_INDEX,
    F_LAYER_INDEX,
    R_LAYER_INDEX,
    B_LAYER_INDEX,
    D_LAYER_INDEX
]
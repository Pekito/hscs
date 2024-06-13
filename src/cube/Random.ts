import { getRandomObjectKey } from "../Utils";
import { LAYER_MOVES } from "./moves";
import { RubiksCubeLayerMoveGroup } from "./Types";
export const getRandomLayer = () => getRandomObjectKey(LAYER_MOVES);
export const getRandomMove = (layer: RubiksCubeLayerMoveGroup) => getRandomObjectKey(layer);

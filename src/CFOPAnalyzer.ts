import { RubiksCube, RubiksCubeCenter, RubiksCubeColor, RubiksCubeFaceState, RubiksCubeLine, RubiksCubePosition } from "./RubiksCube";
import { RubiksCubeFace } from "./RubiksCubeFace";
export class CFOPPositionAnalyzer {
    static doesPositionMatchCenter(position: RubiksCubePosition, face: RubiksCubeFaceState) {
        return face[position.row][position.column] === face[RubiksCubeCenter.row][RubiksCubeCenter.column];
    }
    static areBottomCrossStickersSolved(cube: RubiksCube) {
        return CFOPPositionAnalyzer.doesPositionMatchCenter({
            row:0,
            column: 1
        }, cube._bottomFace.state) && 
        CFOPPositionAnalyzer.doesPositionMatchCenter({
            row: 1,
            column: 2
        }, cube._bottomFace.state) && 
        CFOPPositionAnalyzer.doesPositionMatchCenter({
            row: 1,
            column: 0,
        }, cube._bottomFace.state) &&
        CFOPPositionAnalyzer.doesPositionMatchCenter({
            row: 2,
            column: 1
        }, cube._bottomFace.state);

    }
    static isCrossSolved(cube: RubiksCube) {
        const dLayerMatch = (face: RubiksCubeFace) => CFOPPositionAnalyzer.doesPositionMatchCenter({
            row: 2,
            column: 1
        }, face.state);
        const F = dLayerMatch(cube._frontFace);
        const R = dLayerMatch(cube._rightFace);
        const L = dLayerMatch(cube._leftFace);
        const B = dLayerMatch(cube._backFace);
        const doesDLayerMatch = F && R && L && B;

        return CFOPPositionAnalyzer.areBottomCrossStickersSolved(cube) && doesDLayerMatch;
    }
}
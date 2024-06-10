import { RubiksCube, RubiksCubeColor, RubiksCubeFaceNotation, RubiksCubeGridPosition } from "./RubiksCube";
const faceMap: Record<RubiksCubeFaceNotation, number> = {
    'U': 0,
    'L': 1,
    'F': 2,
    'R': 3,
    'B': 4,
    'D': 5
};
type RubiksCubeEdge = [RubiksCubeColor, RubiksCubeColor];
type RubiksCubeCorner = [RubiksCubeColor,RubiksCubeColor,RubiksCubeColor];

export const getEdge = (notation: string, cube: RubiksCube): RubiksCubeEdge => {
    if(notation.length !== 2) throw new Error("Invalid Edge Length");
    const [primaryFace, secondaryFace] = notation;
    const primaryFaceIndex = faceMap[primaryFace];
    const secondaryFaceIndex = faceMap[secondaryFace];
    const createGetFaceSticker = (faceIndex: number) => (row: RubiksCubeGridPosition, column: RubiksCubeGridPosition) => cube.state[faceIndex][row][column];
    const getPrimarySticker = createGetFaceSticker(primaryFaceIndex);
    const getSecondarySticker = createGetFaceSticker(secondaryFaceIndex);
    switch (primaryFace as RubiksCubeFaceNotation) {
        case "U": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "L": return [getPrimarySticker(1,0), getSecondarySticker(0,1)]
                case "F": return [getPrimarySticker(2,1), getSecondarySticker(0,1)]
                case "R": return [getPrimarySticker(1,2), getSecondarySticker(0,1)]
                case "B": return [getPrimarySticker(0,1), getSecondarySticker(0,1)]
            }
        }
        case "D": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "L": return [getPrimarySticker(1,0), getSecondarySticker(2,1)]
                case "F": return [getPrimarySticker(0,1), getSecondarySticker(2,1)]
                case "R": return [getPrimarySticker(1,2), getSecondarySticker(2,1)]
                case "B": return [getPrimarySticker(2,1), getSecondarySticker(2,1)]
            }
        }
        case "L": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "U": return [getPrimarySticker(0,1), getSecondarySticker(1,0)]
                case "F": return [getPrimarySticker(1,2), getSecondarySticker(1,0)]
                case "B": return [getPrimarySticker(1,0), getSecondarySticker(1,2)]
                case "D": return [getPrimarySticker(2,1), getSecondarySticker(1,0)]
            }
        }
        case "F": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "U": return [getPrimarySticker(0,1), getSecondarySticker(2,1)]
                case "L": return [getPrimarySticker(1,0), getSecondarySticker(1,2)]
                case "R": return [getPrimarySticker(1,2), getSecondarySticker(1,0)]
                case "D": return [getPrimarySticker(2,1), getSecondarySticker(0,1)]
            }
        }
        case "R": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "U": return [getPrimarySticker(0,1), getSecondarySticker(1,2)]
                case "F": return [getPrimarySticker(1,0), getSecondarySticker(1,2)]
                case "B": return [getPrimarySticker(1,2), getSecondarySticker(1,0)]
                case "D": return [getPrimarySticker(2,1), getSecondarySticker(1,2)]
            }
        }
        case "B": {
            switch(secondaryFace as RubiksCubeFaceNotation) {
                case "U": return [getPrimarySticker(0,1), getSecondarySticker(0,1)]
                case "L": return [getPrimarySticker(1,2), getSecondarySticker(1,0)]
                case "R": return [getPrimarySticker(1,0), getSecondarySticker(1,2)]
                case "D": return [getPrimarySticker(2,1), getSecondarySticker(2,1)]
            }
        }
    }
    throw new Error(`Invalid Piece Notation ${notation}`);
}
export const getCenterColor = (face: RubiksCubeFaceNotation, cube: RubiksCube) => {
    const faceIndex = faceMap[face];
    return cube.state[faceIndex][1][1];
}
export const isEdgeSolved = (pieceNotation: string, cube: RubiksCube) => {
    const piece = getEdge(pieceNotation, cube);
    const centerColor = getCenterColor(pieceNotation[0] as RubiksCubeFaceNotation, cube);
    const secondaryCenterColor = getCenterColor(pieceNotation[1] as RubiksCubeFaceNotation, cube);
    return centerColor === piece[0] && secondaryCenterColor === piece[1];
}

export const isBottomCrossSolved = (cube:RubiksCube) => {
    return isEdgeSolved("DF", cube) &&
    isEdgeSolved("DR", cube) && 
    isEdgeSolved("DB", cube) && 
    isEdgeSolved("DL", cube); 
}
import { RubiksCubeFace } from "./RubiksCubeFace";
export type RubiksCubeFaceNotation = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

// W = White | R = Red | G = Green | O = Orange | B = Blue | Y = Yellow
export type RubiksCubeColor = 'W' | 'R' | 'G' | 'O' | 'B' | 'Y';
export type RubiksCubeLine = [RubiksCubeColor,RubiksCubeColor,RubiksCubeColor];
export type RubiksCubeFaceState = [RubiksCubeLine,RubiksCubeLine,RubiksCubeLine];
type RubiksCubeUpFaceState = RubiksCubeFaceState;
type RubiksCubeLeftFaceState = RubiksCubeFaceState;
type RubiksCubeFrontFaceState = RubiksCubeFaceState;
type RubiksCubeRightFaceState = RubiksCubeFaceState;
type RubiksCubeBackFaceState = RubiksCubeFaceState;
type RubiksCubeBottomFaceState = RubiksCubeFaceState;
export type RubiksCubeState = [
    RubiksCubeUpFaceState,
    RubiksCubeLeftFaceState,
    RubiksCubeFrontFaceState,
    RubiksCubeRightFaceState,
    RubiksCubeBackFaceState,
    RubiksCubeBottomFaceState
]
export const RubiksCubeCenter: RubiksCubePosition = {
    column: 1,
    row: 1
};
export type RubiksCubeGridPosition = 0 | 1 | 2;
export type RubiksCubePosition = {
    column: RubiksCubeGridPosition;
    row: RubiksCubeGridPosition;
};
export class RubiksCube {
    static createRubiksCubeFace = (color: RubiksCubeColor): RubiksCubeFaceState => [[color,color,color],[color,color,color],[color,color,color]];
    state: RubiksCubeState;
    _upFace: RubiksCubeFace; 
    _leftFace: RubiksCubeFace;
    _frontFace: RubiksCubeFace;
    _rightFace: RubiksCubeFace;
    _backFace: RubiksCubeFace;
    _bottomFace: RubiksCubeFace;
    constructor({
        upFace = RubiksCube.createRubiksCubeFace('W'),
        leftFace = RubiksCube.createRubiksCubeFace('O'),
        frontFace = RubiksCube.createRubiksCubeFace('G'),
        rightFace = RubiksCube.createRubiksCubeFace('R'),
        backFace = RubiksCube.createRubiksCubeFace('B'),
        bottomFace = RubiksCube.createRubiksCubeFace('Y'),
    } = {}) {
        this.state = [upFace,leftFace,frontFace,rightFace,backFace,bottomFace];
        this._upFace = new RubiksCubeFace(upFace);
        this._leftFace = new RubiksCubeFace(leftFace);
        this._frontFace = new RubiksCubeFace(frontFace);
        this._rightFace = new RubiksCubeFace(rightFace);
        this._backFace = new RubiksCubeFace(backFace);
        this._bottomFace = new RubiksCubeFace(bottomFace);
    }
    get upFace() {return this._upFace.state}
    get leftFace() {return this._leftFace.state}
    get frontFace() {return this._frontFace.state}
    get rightFace() {return this._rightFace.state}
    get backFace() {return this._backFace.state}
    get bottomFace() {return this._bottomFace.state}
    isSolved() {
        return this.state.every(face => face.every(row => row.every((color) => color === row[0])))
    }
    printState() {
        const printFace = (face: RubiksCubeFaceState) => {
            return face.map(row => row.join(' ')).join('\n');
        };

        const upFace = printFace(this._upFace.state).split('\n').map(row => '         ' + row).join('\n');
        const bottomFace = printFace(this._bottomFace.state).split('\n').map(row => '         ' + row).join('\n');

        const leftFaceRows = printFace(this._leftFace.state).split('\n');
        const frontFaceRows = printFace(this._frontFace.state).split('\n');
        const rightFaceRows = printFace(this._rightFace.state).split('\n');
        const backFaceRows = printFace(this._backFace.state).split('\n');

        const middleLayer = leftFaceRows.map((row, i) => '   ' + row + ' ' + frontFaceRows[i] + ' ' + rightFaceRows[i] + ' ' + backFaceRows[i]).join('\n');

        console.log(upFace);
        console.log(middleLayer);
        console.log(bottomFace);
    }
     getRow(position: RubiksCubeGridPosition, face: RubiksCubeFaceState) {
        return [...face[position]];
    }
     getColumn(position: RubiksCubeGridPosition, face: RubiksCubeFaceState) {
        return [face[0][position], face[1][position], face[2][position]];
    }
    getFirstColumn = (face: RubiksCubeFaceState) => this.getColumn(0, face);
    getSecondColumn = (face: RubiksCubeFaceState) => this.getColumn(1, face);
    getThirdColumn = (face: RubiksCubeFaceState) => this.getColumn(2, face);
    
    getFirstRow = (face: RubiksCubeFaceState) => this.getRow(0, face);
    getSecondRow = (face: RubiksCubeFaceState) => this.getRow(1, face);
    getThirdRow = (face: RubiksCubeFaceState) => this.getRow(2, face);
    getPiece = (primaryFace: RubiksCubeFace, secondaryFace: RubiksCubeFace) => {
    }
    rotateRightClockwise() {
        const upRightColumn = (this._upFace).getThirdColumn();
        const frontRightColumn = (this._frontFace).getThirdColumn();
        const backLeftColumn = (this._backFace).getFirstColumn();
        const bottomRightColumn = (this._bottomFace).getThirdColumn();
        this._rightFace.rotateClockwise();
        this.upFace[0][2] = frontRightColumn[0];
        this.upFace[1][2] = frontRightColumn[1];
        this.upFace[2][2] = frontRightColumn[2];

        this.backFace[0][0] = upRightColumn[2];
        this.backFace[1][0] = upRightColumn[1];
        this.backFace[2][0] = upRightColumn[0];

        this.bottomFace[0][2] = backLeftColumn[2];
        this.bottomFace[1][2] = backLeftColumn[1];
        this.bottomFace[2][2] = backLeftColumn[0];

        this.frontFace[0][2] = bottomRightColumn[0];
        this.frontFace[1][2] = bottomRightColumn[1];
        this.frontFace[2][2] = bottomRightColumn[2];
    }
    rotateRightCounterClockwise() {
        const upRightColumn = (this._upFace).getThirdColumn();
        const frontRightColumn = (this._frontFace).getThirdColumn();
        const backLeftColumn = (this._backFace).getFirstColumn();
        const bottomRightColumn = (this._bottomFace).getThirdColumn();
        this._rightFace.rotateCounterClockwise();
        this.upFace[0][2] = backLeftColumn[2];
        this.upFace[1][2] = backLeftColumn[1];
        this.upFace[2][2] = backLeftColumn[0];
    
        this.frontFace[0][2] = upRightColumn[0];
        this.frontFace[1][2] = upRightColumn[1];
        this.frontFace[2][2] = upRightColumn[2];
    
        this.bottomFace[0][2] = frontRightColumn[0];
        this.bottomFace[1][2] = frontRightColumn[1];
        this.bottomFace[2][2] = frontRightColumn[2];
    
        this.backFace[0][0] = bottomRightColumn[2];
        this.backFace[1][0] = bottomRightColumn[1];
        this.backFace[2][0] = bottomRightColumn[0];
    }
    rotateRightTwice() {
        this.rotateRightClockwise();
        this.rotateRightClockwise();
    }
    rotateUpClockwise() {
        const frontFirstRow = this._frontFace.getFirstRow();
        const leftFirstRow = this._leftFace.getFirstRow();
        const backFirstRow = (this._backFace).getFirstRow();
        const rightFirstRow = (this._rightFace).getFirstRow();
        this._upFace.rotateClockwise();
        
        this.frontFace[0][0] = rightFirstRow[0];
        this.frontFace[0][1] = rightFirstRow[1];
        this.frontFace[0][2] = rightFirstRow[2];

        this.leftFace[0][0] = frontFirstRow[0];
        this.leftFace[0][1] = frontFirstRow[1];
        this.leftFace[0][2] = frontFirstRow[2];

        
        this.backFace[0][0] = leftFirstRow[0];
        this.backFace[0][1] = leftFirstRow[1];
        this.backFace[0][2] = leftFirstRow[2];

        this.rightFace[0][0] = backFirstRow[0];
        this.rightFace[0][1] = backFirstRow[1];
        this.rightFace[0][2] = backFirstRow[2];
    }
    rotateUpCounterClockwise() {
        const frontFirstRow = this._frontFace.getFirstRow();
        const leftFirstRow = (this._leftFace).getFirstRow();
        const backFirstRow = (this._backFace).getFirstRow();
        const rightFirstRow = (this._rightFace).getFirstRow();
        this._upFace.rotateCounterClockwise();
    
        this.frontFace[0][0] = leftFirstRow[0];
        this.frontFace[0][1] = leftFirstRow[1];
        this.frontFace[0][2] = leftFirstRow[2];
    
        this.leftFace[0][0] = backFirstRow[0];
        this.leftFace[0][1] = backFirstRow[1];
        this.leftFace[0][2] = backFirstRow[2];
    
        this.backFace[0][0] = rightFirstRow[0];
        this.backFace[0][1] = rightFirstRow[1];
        this.backFace[0][2] = rightFirstRow[2];
    
        this.rightFace[0][0] = frontFirstRow[0];
        this.rightFace[0][1] = frontFirstRow[1];
        this.rightFace[0][2] = frontFirstRow[2];
    }
    rotateUpTwice() {
        this.rotateUpClockwise();
        this.rotateUpClockwise();
    }
    rotateLeftClockwise() {
        const upLeftColumn = (this._upFace).getFirstColumn();
        const frontLeftColumn = (this._frontFace).getFirstColumn();
        const backRightColumn = (this._backFace).getThirdColumn();
        const bottomLeftColumn = (this._bottomFace).getFirstColumn();
        this._leftFace.rotateClockwise();
        this.upFace[0][0] = backRightColumn[2];
        this.upFace[1][0] = backRightColumn[1];
        this.upFace[2][0] = backRightColumn[0];
    
        this.frontFace[0][0] = upLeftColumn[0];
        this.frontFace[1][0] = upLeftColumn[1];
        this.frontFace[2][0] = upLeftColumn[2];
    
        this.bottomFace[0][0] = frontLeftColumn[0];
        this.bottomFace[1][0] = frontLeftColumn[1];
        this.bottomFace[2][0] = frontLeftColumn[2];
    
        this.backFace[0][2] = bottomLeftColumn[2];
        this.backFace[1][2] = bottomLeftColumn[1];
        this.backFace[2][2] = bottomLeftColumn[0];
    }
    rotateLeftCounterClockwise() {
        const upLeftColumn = (this._upFace).getFirstColumn();
        const frontLeftColumn = (this._frontFace).getFirstColumn();
        const backRightColumn = (this._backFace).getThirdColumn();
        const bottomLeftColumn = (this._bottomFace).getFirstColumn();
        this._leftFace.rotateCounterClockwise();
    
        this.upFace[0][0] = frontLeftColumn[0];
        this.upFace[1][0] = frontLeftColumn[1];
        this.upFace[2][0] = frontLeftColumn[2];
    
        this.frontFace[0][0] = bottomLeftColumn[0];
        this.frontFace[1][0] = bottomLeftColumn[1];
        this.frontFace[2][0] = bottomLeftColumn[2];
    
        this.bottomFace[0][0] = backRightColumn[2];
        this.bottomFace[1][0] = backRightColumn[1];
        this.bottomFace[2][0] = backRightColumn[0];
    
        this.backFace[0][2] = upLeftColumn[2];
        this.backFace[1][2] = upLeftColumn[1];
        this.backFace[2][2] = upLeftColumn[0];
    }
    rotateLeftTwice() {
        this.rotateLeftClockwise();
        this.rotateLeftClockwise();
    }
    rotateBottomClockwise() {
        const frontBottomRow = (this._frontFace).getThirdRow();
        const rightBottomRow = (this._rightFace).getThirdRow();
        const backBottomRow = (this._backFace).getThirdRow();
        const leftBottomRow = (this._leftFace).getThirdRow();
        this._bottomFace.rotateClockwise();

        this.frontFace[2][0] = leftBottomRow[0];
        this.frontFace[2][1] = leftBottomRow[1];
        this.frontFace[2][2] = leftBottomRow[2];
    
        this.rightFace[2][0] = frontBottomRow[0];
        this.rightFace[2][1] = frontBottomRow[1];
        this.rightFace[2][2] = frontBottomRow[2];
    
        this.backFace[2][0] = rightBottomRow[0];
        this.backFace[2][1] = rightBottomRow[1];
        this.backFace[2][2] = rightBottomRow[2];
    
        this.leftFace[2][0] = backBottomRow[0];
        this.leftFace[2][1] = backBottomRow[1];
        this.leftFace[2][2] = backBottomRow[2];
    }
    rotateBottomCounterClockwise() {
    const frontBottomRow = (this._frontFace).getThirdRow();
    const rightBottomRow = (this._rightFace).getThirdRow();
    const backBottomRow = (this._backFace).getThirdRow();
    const leftBottomRow = (this._leftFace).getThirdRow();
    this._bottomFace.rotateCounterClockwise();
    this.frontFace[2][0] = rightBottomRow[0];
    this.frontFace[2][1] = rightBottomRow[1];
    this.frontFace[2][2] = rightBottomRow[2];

    this.rightFace[2][0] = backBottomRow[0];
    this.rightFace[2][1] = backBottomRow[1];
    this.rightFace[2][2] = backBottomRow[2];

    this.backFace[2][0] = leftBottomRow[0];
    this.backFace[2][1] = leftBottomRow[1];
    this.backFace[2][2] = leftBottomRow[2];

    this.leftFace[2][0] = frontBottomRow[0];
    this.leftFace[2][1] = frontBottomRow[1];
    this.leftFace[2][2] = frontBottomRow[2];
    }
    rotateBottomTwice() {
        this.rotateBottomClockwise();
        this.rotateBottomClockwise();
    }
    rotateFrontClockwise() {
        const upThirdRow = (this._upFace).getThirdRow();
        const rightFirstColumn = (this._rightFace).getFirstColumn();
        const leftThirdColumn = (this._leftFace).getThirdColumn();
        const bottomFirstRow = (this._bottomFace).getFirstRow();
        this._frontFace.rotateClockwise();
        this.upFace[2][0] = leftThirdColumn[2];
        this.upFace[2][1] = leftThirdColumn[1];
        this.upFace[2][2]  = leftThirdColumn[0];

        this.bottomFace[0][0] = rightFirstColumn[2];
        this.bottomFace[0][1] = rightFirstColumn[1];
        this.bottomFace[0][2] = rightFirstColumn[0]

        this.rightFace[0][0] = upThirdRow[0];
        this.rightFace[1][0] = upThirdRow[1];
        this.rightFace[2][0] = upThirdRow[2];
        
        this.leftFace[0][2] = bottomFirstRow[0];
        this.leftFace[1][2] = bottomFirstRow[1];
        this.leftFace[2][2] = bottomFirstRow[2];
    }
    rotateFrontCounterClockwise() {
        const upThirdRow = (this._upFace).getThirdRow();
        const rightFirstColumn = (this._rightFace).getFirstColumn();
        const leftThirdColumn = (this._leftFace).getThirdColumn();
        const bottomFirstRow = (this._bottomFace).getFirstRow();
        this._frontFace.rotateCounterClockwise();
        this.upFace[2][0] = rightFirstColumn[0]
        this.upFace[2][1] = rightFirstColumn[1] 
        this.upFace[2][2] = rightFirstColumn[2] 

        this.bottomFace[0][0] = leftThirdColumn[0];
        this.bottomFace[0][1] = leftThirdColumn[1];
        this.bottomFace[0][2] = leftThirdColumn[2];

        this.rightFace[0][0] = bottomFirstRow[2];
        this.rightFace[1][0] = bottomFirstRow[1];
        this.rightFace[2][0] = bottomFirstRow[0];
        
        this.leftFace[0][2] = upThirdRow[2];
        this.leftFace[1][2] = upThirdRow[1];
        this.leftFace[2][2] = upThirdRow[0];
    }
    rotateFrontTwice() {
        this.rotateFrontClockwise();
        this.rotateFrontClockwise();
    }
    rotateBackClockwise() {
        const upFirstRow = (this._upFace).getFirstRow();
        const rightThirdColumn = (this._rightFace).getThirdColumn();
        const leftFirstColumn = (this._leftFace).getFirstColumn();
        const bottomThirdRow = (this._bottomFace).getThirdRow();
        this._backFace.rotateClockwise();
        this.upFace[0][0] = rightThirdColumn[0];
        this.upFace[0][1] = rightThirdColumn[1];
        this.upFace[0][2] = rightThirdColumn[2];

        this.bottomFace[2][0] = leftFirstColumn[0];
        this.bottomFace[2][1] = leftFirstColumn[1];
        this.bottomFace[2][2] = leftFirstColumn[2];

        this.rightFace[0][2] = bottomThirdRow[2];
        this.rightFace[1][2] = bottomThirdRow[1];
        this.rightFace[2][2] = bottomThirdRow[0];

        this.leftFace[0][0] = upFirstRow[2];
        this.leftFace[1][0] = upFirstRow[1];
        this.leftFace[2][0] = upFirstRow[0];
    }
    rotateBackCounterClockwise() {
        const upFirstRow = (this._upFace).getFirstRow();
        const rightThirdColumn = (this._rightFace).getThirdColumn();
        const leftFirstColumn = (this._leftFace).getFirstColumn();
        const bottomThirdRow = (this._bottomFace).getThirdRow();
        this._backFace.rotateCounterClockwise();
        this.upFace[0][0] = leftFirstColumn[2];
        this.upFace[0][1] = leftFirstColumn[1];
        this.upFace[0][2] = leftFirstColumn[0];

        this.bottomFace[2][0] = rightThirdColumn[2];
        this.bottomFace[2][1] = rightThirdColumn[1];
        this.bottomFace[2][2] = rightThirdColumn[0];

        this.rightFace[0][2] = upFirstRow[0];
        this.rightFace[1][2] = upFirstRow[1];
        this.rightFace[2][2] = upFirstRow[2];

        this.leftFace[0][0] = bottomThirdRow[0];
        this.leftFace[1][0] = bottomThirdRow[1];
        this.leftFace[2][0] = bottomThirdRow[2];
    }
    rotateBackTwice() {
        this.rotateBackClockwise();
        this.rotateBackClockwise();
    }
}
// W = White | R = Red | G = Green | O = Orange | B = Blue | Y = Yellow
type RubiksCubeColor = 'W' | 'R' | 'G' | 'O' | 'B' | 'Y';
type RubiksCubeRow = [RubiksCubeColor,RubiksCubeColor,RubiksCubeColor];
type RubiksCubeFace = [RubiksCubeRow,RubiksCubeRow,RubiksCubeRow];
type RubiksCubeRowPosition = 0 | 1 | 2;
type RubiksCubeColumnPosition = 0 | 1 | 2;
export class RubiksCube {
    static createRubiksCubeFace = (color: RubiksCubeColor): RubiksCubeFace => [[color,color,color],[color,color,color],[color,color,color]];

    upFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('W');
    leftFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('O');
    frontFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('G');
    rightFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('R');
    backFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('B');
    bottomFace: RubiksCubeFace = RubiksCube.createRubiksCubeFace('Y');
    printState() {
        const printFace = (face: RubiksCubeFace) => {
            return face.map(row => row.join(' ')).join('\n');
        };

        const upFace = printFace(this.upFace).split('\n').map(row => '         ' + row).join('\n');
        const bottomFace = printFace(this.bottomFace).split('\n').map(row => '         ' + row).join('\n');

        const leftFaceRows = printFace(this.leftFace).split('\n');
        const frontFaceRows = printFace(this.frontFace).split('\n');
        const rightFaceRows = printFace(this.rightFace).split('\n');
        const backFaceRows = printFace(this.backFace).split('\n');

        const middleLayer = leftFaceRows.map((row, i) => '   ' + row + ' ' + frontFaceRows[i] + ' ' + rightFaceRows[i] + ' ' + backFaceRows[i]).join('\n');

        console.log(upFace);
        console.log(middleLayer);
        console.log(bottomFace);
    }
    private rotateFaceClockwise(face: RubiksCubeFace) {
        const currentFace = structuredClone(face);

        face[0][0] = currentFace[2][0];
        face[0][1] = currentFace[1][0];
        face[0][2] = currentFace[0][0];

        face[1][0] = currentFace[2][1];
        face[1][2] = currentFace[0][1];

        face[2][0] = currentFace[2][2];
        face[2][1] = currentFace[1][2];
        face[2][2] = currentFace[0][2];

    }
    private rotateFaceCounterClockwise(face: RubiksCubeFace) {
        const currentFace = structuredClone(face);

        face[0][0] = currentFace[0][2];
        face[0][1] = currentFace[1][2];
        face[0][2] = currentFace[2][2];

        face[1][0] = currentFace[0][1];
        face[1][2] = currentFace[2][1];

        face[2][0] = currentFace[0][0];
        face[2][1] = currentFace[1][0];
        face[2][2] = currentFace[2][0];
    }
     getRow(position: RubiksCubeRowPosition, face: RubiksCubeFace) {
        return [...face[position]];
    }
     getColumn(position: RubiksCubeColumnPosition, face: RubiksCubeFace) {
        return [face[0][position], face[1][position], face[2][position]];
    }
    getFirstColumn = (face: RubiksCubeFace) => this.getColumn(0, face);
    getSecondColumn = (face: RubiksCubeFace) => this.getColumn(1, face);
    getThirdColumn = (face: RubiksCubeFace) => this.getColumn(2, face);
    
    getFirstRow = (face: RubiksCubeFace) => this.getRow(0, face);
    getSecondRow = (face: RubiksCubeFace) => this.getRow(1, face);
    getThirdRow = (face: RubiksCubeFace) => this.getRow(2, face);

    rotateRightClockwise() {
        const upRightColumn = this.getThirdColumn(this.upFace);
        const frontRightColumn = this.getThirdColumn(this.frontFace);
        const backLeftColumn = this.getFirstColumn(this.backFace);
        const bottomRightColumn = this.getThirdColumn(this.bottomFace);
        this.rotateFaceClockwise(this.rightFace);

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
        const upRightColumn = this.getThirdColumn(this.upFace);
        const frontRightColumn = this.getThirdColumn(this.frontFace);
        const backLeftColumn = this.getFirstColumn(this.backFace);
        const bottomRightColumn = this.getThirdColumn(this.bottomFace);
        this.rotateFaceCounterClockwise(this.rightFace);
    
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
    
    rotateUpClockwise() {
        const frontFirstRow = this.getFirstRow(this.frontFace);
        const leftFirstRow = this.getFirstRow(this.leftFace);
        const backFirstRow = this.getFirstRow(this.backFace);
        const rightFirstRow = this.getFirstRow(this.rightFace);
        this.rotateFaceClockwise(this.upFace);
        
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
        const frontFirstRow = this.getFirstRow(this.frontFace);
        const leftFirstRow = this.getFirstRow(this.leftFace);
        const backFirstRow = this.getFirstRow(this.backFace);
        const rightFirstRow = this.getFirstRow(this.rightFace);
        this.rotateFaceCounterClockwise(this.upFace);
    
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
        this.rotateFaceClockwise(this.leftFace);
        const upLeftColumn = this.getFirstColumn(this.upFace);
        const frontLeftColumn = this.getFirstColumn(this.frontFace);
        const backRightColumn = this.getThirdColumn(this.backFace);
        const bottomLeftColumn = this.getFirstColumn(this.bottomFace);
    
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
        const upLeftColumn = this.getFirstColumn(this.upFace);
        const frontLeftColumn = this.getFirstColumn(this.frontFace);
        const backRightColumn = this.getThirdColumn(this.backFace);
        const bottomLeftColumn = this.getFirstColumn(this.bottomFace);
        this.rotateFaceCounterClockwise(this.leftFace);
    
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
        this.rotateFaceClockwise(this.bottomFace);
        const frontBottomRow = this.getThirdRow(this.frontFace);
        const rightBottomRow = this.getThirdRow(this.rightFace);
        const backBottomRow = this.getThirdRow(this.backFace);
        const leftBottomRow = this.getThirdRow(this.leftFace);
    
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
    const frontBottomRow = this.getThirdRow(this.frontFace);
    const rightBottomRow = this.getThirdRow(this.rightFace);
    const backBottomRow = this.getThirdRow(this.backFace);
    const leftBottomRow = this.getThirdRow(this.leftFace);
    this.rotateFaceCounterClockwise(this.bottomFace);

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
        const upThirdRow = this.getThirdRow(this.upFace);
        const rightFirstColumn = this.getFirstColumn(this.rightFace);
        const leftThirdColumn = this.getThirdColumn(this.leftFace);
        const bottomFirstRow = this.getFirstRow(this.bottomFace);
        this.rotateFaceClockwise(this.frontFace);

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
        const upThirdRow = this.getThirdRow(this.upFace);
        const rightFirstColumn = this.getFirstColumn(this.rightFace);
        const leftThirdColumn = this.getThirdColumn(this.leftFace);
        const bottomFirstRow = this.getFirstRow(this.bottomFace);
        this.rotateFaceCounterClockwise(this.frontFace);

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
        const upFirstRow = this.getFirstRow(this.upFace);
        const rightThirdColumn = this.getThirdColumn(this.rightFace);
        const leftFirstColumn = this.getFirstColumn(this.leftFace);
        const bottomThirdRow = this.getThirdRow(this.bottomFace);
        this.rotateFaceClockwise(this.backFace);

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
        const upFirstRow = this.getFirstRow(this.upFace);
        const rightThirdColumn = this.getThirdColumn(this.rightFace);
        const leftFirstColumn = this.getFirstColumn(this.leftFace);
        const bottomThirdRow = this.getThirdRow(this.bottomFace);
        this.rotateFaceCounterClockwise(this.backFace);

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
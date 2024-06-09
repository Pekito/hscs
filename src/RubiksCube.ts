// W = White | R = Red | G = Green | O = Orange | B = Blue | Y = Yellow
type RubiksCubeColor = 'W' | 'R' | 'G' | 'O' | 'B' | 'Y';
type RubiksCubeRow = [RubiksCubeColor,RubiksCubeColor,RubiksCubeColor];
type RubiksCubeFace = [RubiksCubeRow,RubiksCubeRow,RubiksCubeRow];
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
    rotateRightClockwise() {
        const currentUpFace = structuredClone(this.upFace);
        const currentFrontFace = structuredClone(this.frontFace);
        const currentBackFace = structuredClone(this.backFace);
        const currentBottomFace = structuredClone(this.bottomFace);
        this.rotateFaceClockwise(this.rightFace);

        this.upFace[0][2] = currentFrontFace[0][2];
        this.upFace[1][2] = currentFrontFace[1][2];
        this.upFace[2][2] = currentFrontFace[2][2];

        this.backFace[0][0] = currentUpFace[2][2];
        this.backFace[1][0] = currentUpFace[1][2];
        this.backFace[2][0] = currentUpFace[0][2];

        this.bottomFace[0][2] = currentBackFace[2][0];
        this.bottomFace[1][2] = currentBackFace[1][0];
        this.bottomFace[2][2] = currentBackFace[0][0];

        this.frontFace[0][2] = currentBottomFace[0][2];
        this.frontFace[1][2] = currentBottomFace[1][2];
        this.frontFace[2][2] = currentBottomFace[2][2];
    }
    rotateRightCounterClockwise() {
        const currentUpFace = structuredClone(this.upFace);
        const currentFrontFace = structuredClone(this.frontFace);
        const currentBackFace = structuredClone(this.backFace);
        const currentBottomFace = structuredClone(this.bottomFace);
        this.rotateFaceCounterClockwise(this.rightFace);
    
        this.upFace[0][2] = currentBackFace[2][0];
        this.upFace[1][2] = currentBackFace[1][0];
        this.upFace[2][2] = currentBackFace[0][0];
    
        this.frontFace[0][2] = currentUpFace[0][2];
        this.frontFace[1][2] = currentUpFace[1][2];
        this.frontFace[2][2] = currentUpFace[2][2];
    
        this.bottomFace[0][2] = currentFrontFace[0][2];
        this.bottomFace[1][2] = currentFrontFace[1][2];
        this.bottomFace[2][2] = currentFrontFace[2][2];
    
        this.backFace[0][0] = currentBottomFace[2][2];
        this.backFace[1][0] = currentBottomFace[1][2];
        this.backFace[2][0] = currentBottomFace[0][2];
    }
    
    rotateUpClockwise() {
        const currentLeftFace = structuredClone(this.leftFace);
        const currentRightFace = structuredClone(this.rightFace);
        const currentFrontFace = structuredClone(this.frontFace);
        const currentBackFace = structuredClone(this.backFace);
        this.rotateFaceClockwise(this.upFace);

        this.frontFace[0][0] = currentRightFace[0][0];
        this.frontFace[0][1] = currentRightFace[0][1];
        this.frontFace[0][2] = currentRightFace[0][2];

        this.leftFace[0][0] = currentFrontFace[0][0];
        this.leftFace[0][1] = currentFrontFace[0][1];
        this.leftFace[0][2] = currentFrontFace[0][2];

        
        this.backFace[0][0] = currentLeftFace[0][0];
        this.backFace[0][1] = currentLeftFace[0][1];
        this.backFace[0][2] = currentLeftFace[0][2];

        this.rightFace[0][0] = currentBackFace[0][0];
        this.rightFace[0][1] = currentBackFace[0][1];
        this.rightFace[0][2] = currentBackFace[0][2];
    }
}
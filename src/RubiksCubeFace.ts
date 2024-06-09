import { RubiksCubeColor, RubiksCubeColumnPosition, RubiksCubeFaceState, RubiksCubeLine, RubiksCubeRowPosition } from "./RubiksCube";

export class RubiksCubeFace {
    state: RubiksCubeFaceState;
    constructor(state: RubiksCubeFaceState) {
        this.state = state;
    }
    private getRow(position: RubiksCubeRowPosition, ) {
        return [...this.state[position]];
    }
    private getColumn(position: RubiksCubeColumnPosition, ) {
        return [this.state[0][position], this.state[1][position], this.state[2][position]];
    }
    private createColumnSetter(columnNumber: RubiksCubeColumnPosition) {
        return (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => {
            this.state[0][columnNumber] = first;
            this.state[1][columnNumber] = middle;
            this.state[2][columnNumber] = last;
        }
    }
    private createRowSetter(rowNumber: RubiksCubeRowPosition) {
        return (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => {
            this.state[rowNumber][0] = first;
            this.state[rowNumber][1] = middle;
            this.state[rowNumber][2] = last;
        }
    }
    rotateClockwise() {
        const currentState = structuredClone(this.state);

        this.state[0][0] = currentState[2][0];
        this.state[0][1] = currentState[1][0];
        this.state[0][2] = currentState[0][0];

        this.state[1][0] = currentState[2][1];
        this.state[1][2] = currentState[0][1];

        this.state[2][0] = currentState[2][2];
        this.state[2][1] = currentState[1][2];
        this.state[2][2] = currentState[0][2];
    }

    rotateCounterClockwise() {
        const currentState = structuredClone(this.state);

        this.state[0][0] = currentState[0][2];
        this.state[0][1] = currentState[1][2];
        this.state[0][2] = currentState[2][2];

        this.state[1][0] = currentState[0][1];
        this.state[1][2] = currentState[2][1];

        this.state[2][0] = currentState[0][0];
        this.state[2][1] = currentState[1][0];
        this.state[2][2] = currentState[2][0];
    }
    getFirstColumn = () => this.getColumn(0);
    getSecondColumn = () => this.getColumn(1);
    getThirdColumn = () => this.getColumn(2);
    getFirstRow = () => this.getRow(0);
    getSecondRow = () => this.getRow(1);
    getThirdRow = () => this.getRow(2);

    setFirstColumn = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createColumnSetter(0)(first, middle, last);
    setSecondColumn = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createColumnSetter(1)(first, middle, last);
    setThirdColumn = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createColumnSetter(2)(first, middle, last);

    setFirstRow = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createRowSetter(0)(first, middle, last);
    setSecondRow = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createRowSetter(1)(first, middle, last);
    setThirdRow = (first: RubiksCubeColor, middle: RubiksCubeColor, last: RubiksCubeColor) => this.createRowSetter(2)(first, middle, last);
}
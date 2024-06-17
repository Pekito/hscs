import { RubiksCube, RubiksCubeMove } from "../../cube/Types";
import { createRubiksCubeStateKey } from "../../solvers/Utils";
import { createBottomCrossStateKey } from "../../state-generators/bottomCross";

type BottomCrossRow = {
    bottomCrossState: string;
    cube_state: string;
    solved: boolean;
    optimal_solution: string;
    depth: number;
}
type BottomCrossState = {
    bottomCrossState: number[];
    cube: RubiksCube;
    solved: boolean;
    optimal_solution: string;
    depth: number;
}
const createRow = (params: {
    cube: RubiksCube
}) => {
    const row: BottomCrossRow = {
        bottomCrossState: createBottomCrossStateKey(params.cube),
        cube_state: createRubiksCubeStateKey(params.cube),
        solved: false,
        optimal_solution: "",
        depth: -1
    }
}
const solveRow = (params: {
    bottomCrossState: RubiksCube,
    solution: RubiksCubeMove[]
}) => {
    const stateKey = createBottomCrossStateKey(params.bottomCrossState);
    `
        UPDATE
            cross_states
        SET
            solved = true,
            optimal_solution = $1,
            depth: $2
        WHERE
            bottomCrossState = $3
    `;

}
export {
    createRow,
    solveRow
} 
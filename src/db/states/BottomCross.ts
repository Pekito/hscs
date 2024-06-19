import { mapNotationArrayToMove } from "../../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../../cube/Types";
import { createRubiksCubeStateKey } from "../../solvers/Utils";
import { createBottomCrossStateKey, findEveryBottomCrossState } from "../../state-generators/BottomCross";
import { BOTTOM_CROSS_STATES_TABLE } from "../constants";
import database, { SQLiteModule } from "../database";

const createStatesTable = async () => {
    database.run(`DROP TABLE IF EXISTS ${BOTTOM_CROSS_STATES_TABLE}`)
    database.run(`CREATE TABLE IF NOT EXISTS ${BOTTOM_CROSS_STATES_TABLE} 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            edges_position VARCHAR(12) NOT NULL UNIQUE,
            cube_state CHAR(54) NOT NULL,
            optimal_solution VARCHAR(30),
            depth INTEGER
        )`);
}
const populateStatesTable = async () => {
    console.log("[Populate Bottom Cross States] Generating States");
    const crossStates = findEveryBottomCrossState();
    console.log("[Populate Bottom Cross States] Finished Generating");
    console.log("[Populate Bottom Cross States] Inserting on database");

    const batchSize = 1000;
    const totalBatches = Math.ceil(crossStates.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batchStart = batchIndex * batchSize;
        const batchEnd = Math.min(batchStart + batchSize, crossStates.length);
        const batch = crossStates.slice(batchStart, batchEnd);

        const values = batch.map(state => [
            state.stateKey,
            createRubiksCubeStateKey(state.state),
            state.solution,
            state.depth
        ]);

        const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');
        const statement = `INSERT INTO ${BOTTOM_CROSS_STATES_TABLE} (
            edges_position,
            cube_state,
            optimal_solution,
            depth
        ) VALUES ${placeholders}`;

        const flattenedValues = values.flat();

        try {
            database.run(statement, flattenedValues);
        } catch (error) {
            console.error(`Error inserting batch ${batchIndex}: `, error);
        }
    }

    console.log("[Populate Bottom Cross States] Finished inserting into database");
};
export type BottomCrossData = {
    optimalSolution: RubiksCubeMove[],
    depth: number
}
const getSolution = (cube: RubiksCube) => {
    const result = database.query(`
        SELECT 
            optimal_solution, depth 
        FROM 
            ${BOTTOM_CROSS_STATES_TABLE}
        WHERE
            edges_position = ?
        `,[createBottomCrossStateKey(cube)]);
    return mapNotationArrayToMove(result[0].optimal_solution);
}
export default {
    populateStatesTable,
    createStatesTable,
    getSolution
}
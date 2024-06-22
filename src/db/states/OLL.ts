import { mapNotationSequenceToMoveSequence } from "../../cube/Notation";
import { RubiksCube } from "../../cube/Types";
import { createRubiksCubeStateKey } from "../../solvers/Utils";
import { OLL_STATES, OLLKeyCreator } from "../../state-generators/OLL";
import { OLL_STATES_TABLE } from "../constants";
import database from "../database";

const createStatesTable = async () => {

database.run(`DROP TABLE IF EXISTS ${OLL_STATES_TABLE}`);
database.run(`CREATE TABLE IF NOT EXISTS ${OLL_STATES_TABLE} 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        edges_position VARCHAR(12) NOT NULL UNIQUE,
        cube_state CHAR(54) NOT NULL,
        optimal_solution VARCHAR(100),
        depth INTEGER
    )`);
};
const populateStatesTable = async () => {
  console.log("[Populate OLL States] Generating States");

    const olls = OLL_STATES();
    console.log(`[Populate OLL States] Generating States`);
    const stateValues = olls.map((state) => [
      state.stateKey,
      createRubiksCubeStateKey(state.state),
      state.solution,
      state.depth,
    ]);
    const placeholders = stateValues.map(() => "(?, ?, ?, ?)").join(", ");
    console.log(`[Populate OLL States] Inserting States`);
    const statement = `INSERT INTO ${OLL_STATES_TABLE} (
            edges_position,
            cube_state,
            optimal_solution,
            depth
        ) VALUES ${placeholders}`;
    const flattenedValues = stateValues.flat();
    try {
      database.run(statement, flattenedValues);
      console.log(
        `[Populate OLL States] Finished inserting ${OLL_STATES_TABLE} into database`
      );
    } catch (error) {
      console.error(`Error inserting OLL Table`);
    }
  console.log("[Populate OLL States] Finished inserting into database");
};
const getSolution = (cube: RubiksCube) => {
  const result = database.query(`
      SELECT 
          optimal_solution, depth 
      FROM 
          ${OLL_STATES_TABLE}
      WHERE
          edges_position = ?
      `,[OLLKeyCreator(cube)]);
      const sequence = mapNotationSequenceToMoveSequence(result[0].optimal_solution);
  return sequence
}
export default {
  createStatesTable,
  populateStatesTable,
  getSolution
};

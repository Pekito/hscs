import { mapNotationSequenceToMoveSequence } from "../../cube/Notation";
import { RubiksCube } from "../../cube/Types";
import { createRubiksCubeStateKey } from "../../solvers/Utils";
import { PLL_STATES, PLLKeyCreator } from "../../state-generators/PLL";
import { PLL_STATES_TABLE } from "../constants";
import database from "../database";

const createStatesTable = async () => {

database.run(`DROP TABLE IF EXISTS ${PLL_STATES_TABLE}`);
database.run(`CREATE TABLE IF NOT EXISTS ${PLL_STATES_TABLE} 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        edges_position VARCHAR(12) NOT NULL UNIQUE,
        cube_state CHAR(54) NOT NULL,
        optimal_solution VARCHAR(100),
        depth INTEGER
    )`);
};
const populateStatesTable = async () => {
  console.log("[Populate PLL States] Generating States");

    const olls = PLL_STATES();
    console.log(`[Populate PLL States] Generating States`);
    const stateValues = olls.map((state) => [
      state.stateKey,
      createRubiksCubeStateKey(state.state),
      state.solution,
      state.depth,
    ]);
    const placeholders = stateValues.map(() => "(?, ?, ?, ?)").join(", ");
    console.log(`[Populate PLL States] Inserting States`);
    const statement = `INSERT INTO ${PLL_STATES_TABLE} (
            edges_position,
            cube_state,
            optimal_solution,
            depth
        ) VALUES ${placeholders}`;
    const flattenedValues = stateValues.flat();
    try {
      database.run(statement, flattenedValues);
      console.log(
        `[Populate PLL States] Finished inserting ${PLL_STATES_TABLE} into database`
      );
    } catch (error) {
      console.error(`Error inserting PLL Table`);
    }
  console.log("[Populate PLL States] Finished inserting into database");
};
const getSolution = (cube: RubiksCube) => {
  const result = database.query(`
      SELECT 
          optimal_solution, depth 
      FROM 
          ${PLL_STATES_TABLE}
      WHERE
          edges_position = ?
      `,[PLLKeyCreator(cube)]);
      const sequence = mapNotationSequenceToMoveSequence(result[0].optimal_solution);
  return sequence
}
export default {
  createStatesTable,
  populateStatesTable,
  getSolution
};

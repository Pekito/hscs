import { mapNotationSequenceToMoveSequence } from "../../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../../cube/Types";
import { StateFinderResult } from "../../solvers/Finders";
import { createRubiksCubeStateKey } from "../../solvers/Utils";
import {
  createFrontRightF2LStateKey,
  FRONT_RIGHT_F2L_BL_BR_SOLVED_STATES,
  FRONT_RIGHT_F2L_BL_SOLVED_STATES,
  FRONT_RIGHT_F2L_BR_SOLVED_STATES,
  FRONT_RIGHT_F2L_FL_BL_SOLVED_STATES,
  FRONT_RIGHT_F2L_FL_BR_SOLVED_STATES,
  FRONT_RIGHT_F2L_FL_SOLVED_STATES,
  FRONT_RIGHT_F2L_FREE_SLOT_STATES,
  FRONT_RIGHT_F2L_NO_FREE_SLOT_STATES,
} from "../../state-generators/F2L";
import { getSolvedCubeOrientation } from "../../state-generators/SolvedState";
import {
  F2L_FR_BLOCKED_BL_BR_STATES_TABLE,
  F2L_FR_BLOCKED_BL_STATES_TABLE,
  F2L_FR_BLOCKED_BR_STATES_TABLE,
  F2L_FR_BLOCKED_FL_BL_STATES_TABLE,
  F2L_FR_BLOCKED_FL_BR_STATES_TABLE,
  F2L_FR_BLOCKED_FL_STATES_TABLE,
  F2L_FR_FREE_SLOTS_STATES_TABLE,
  F2L_FR_NO_FREE_SLOTS_TABLE,
} from "../constants";
import database, { SQLiteModule } from "../database";

const createStatesTable = async () => {
  [
    F2L_FR_BLOCKED_BL_BR_STATES_TABLE,
    F2L_FR_BLOCKED_FL_BL_STATES_TABLE,
    F2L_FR_BLOCKED_FL_BR_STATES_TABLE,
    F2L_FR_BLOCKED_FL_STATES_TABLE,
    F2L_FR_BLOCKED_BL_STATES_TABLE,
    F2L_FR_BLOCKED_BR_STATES_TABLE,
    F2L_FR_FREE_SLOTS_STATES_TABLE,
    F2L_FR_NO_FREE_SLOTS_TABLE,
  ].forEach((table) => {
    database.run(`DROP TABLE IF EXISTS ${table}`);
    database.run(`CREATE TABLE IF NOT EXISTS ${table} 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            edges_position VARCHAR(12) NOT NULL UNIQUE,
            cube_state CHAR(54) NOT NULL,
            optimal_solution VARCHAR(50),
            depth INTEGER
        )`);
  });
};
const populateStatesTable = async () => {
  console.log("[Populate F2L States] Generating States");
  [
    [F2L_FR_BLOCKED_BL_BR_STATES_TABLE, FRONT_RIGHT_F2L_BL_BR_SOLVED_STATES],
    [F2L_FR_BLOCKED_FL_BL_STATES_TABLE, FRONT_RIGHT_F2L_FL_BL_SOLVED_STATES],
    [F2L_FR_BLOCKED_FL_BR_STATES_TABLE, FRONT_RIGHT_F2L_FL_BR_SOLVED_STATES],
    [F2L_FR_BLOCKED_FL_STATES_TABLE, FRONT_RIGHT_F2L_FL_SOLVED_STATES],
    [F2L_FR_BLOCKED_BL_STATES_TABLE, FRONT_RIGHT_F2L_BL_SOLVED_STATES],
    [F2L_FR_BLOCKED_BR_STATES_TABLE, FRONT_RIGHT_F2L_BR_SOLVED_STATES],
    [F2L_FR_FREE_SLOTS_STATES_TABLE, FRONT_RIGHT_F2L_FREE_SLOT_STATES],
    [F2L_FR_NO_FREE_SLOTS_TABLE, FRONT_RIGHT_F2L_NO_FREE_SLOT_STATES],
  ].forEach((f2lStates) => {
    const [tableName, generator] = f2lStates as [string, Function];
    console.log(`[Populate F2L States] Generating States for ${tableName}`);
    const states = generator() as StateFinderResult;
    const stateValues = states.map((state) => [
      state.stateKey,
      createRubiksCubeStateKey(state.state),
      state.solution,
      state.depth,
    ]);
    const placeholders = stateValues.map(() => "(?, ?, ?, ?)").join(", ");
    console.log(`[Populate F2L States] Inserting States for ${tableName}`);
    const statement = `INSERT INTO ${tableName} (
            edges_position,
            cube_state,
            optimal_solution,
            depth
        ) VALUES ${placeholders}`;
    const flattenedValues = stateValues.flat();
    try {
      database.run(statement, flattenedValues);
      console.log(
        `[Populate F2L States] Finished inserting ${tableName} into database`
      );
    } catch (error) {
      console.error(`Error inserting F2L Table ${tableName}`);
    }
  });
  console.log("[Populate F2L States] Finished inserting into database");
};
const getSolution = (cube: RubiksCube, table: string) => {
  const result = database.query(`
      SELECT 
          optimal_solution, depth 
      FROM 
          ${table}
      WHERE
          edges_position = ?
      `,[createFrontRightF2LStateKey(cube)]);
      const sequence = mapNotationSequenceToMoveSequence(result[0].optimal_solution);
  return sequence
}
export default {
  createStatesTable,
  populateStatesTable,
  getSolution
};

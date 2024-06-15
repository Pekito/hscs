import { expect, test } from "vitest";
import { createCube, moveCube } from "../../src/cube/Cube";
import { U_CLOCKWISE_MOVE } from "../../src/cube/moves";
import { RubiksCubeMove } from "../../src/cube/Types";
import { cubeStateGraph } from "../../src/solvers/DataStructures";


test("Should point to the same index", () => {
  const graph = cubeStateGraph();
  let cube = createCube();
  const appliedMoves: RubiksCubeMove[] = [];
  for (const move of [
    U_CLOCKWISE_MOVE,
    U_CLOCKWISE_MOVE,
    U_CLOCKWISE_MOVE,
    U_CLOCKWISE_MOVE,
    U_CLOCKWISE_MOVE,
    U_CLOCKWISE_MOVE,
  ]) {
    cube = moveCube(cube, move);
    appliedMoves.push(move);
    graph.add(appliedMoves, cube);
  }
  expect(graph.stateEdges.get("U")).toEqual(graph.stateEdges.get("UUUUU"));
});




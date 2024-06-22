import { CubeScheme, WCA_COLOR_SCHEME } from "../cube/Schemes";
import { RubiksCube, UnidimensionalCube } from "../cube/Types";
export const getIndexColor = (index: number, scheme: CubeScheme = WCA_COLOR_SCHEME) => {
    const faceIndex = Math.floor(index / 9);
    return scheme[faceIndex];
}
export const getColoredCube = (cube: RubiksCube, scheme: CubeScheme, ) => {
      return cube.map((_, index) => getIndexColor(cube[index]), scheme);
}
export const print2DCube = (cube: UnidimensionalCube<any>, identifier: string = "") => {
    console.log(`[---------------------------${identifier}---------------------------]`)
    console.log("           " + cube.slice(0, 3).join(" "));
    console.log("           " + cube.slice(3, 6).join(" "));
    console.log("           " + cube.slice(6, 9).join(" "));
    console.log("");
    console.log("    " + cube.slice(9, 12).join(" ") + "  " + cube.slice(18, 21).join(" ") + "  " + cube.slice(27, 30).join(" ") + "  " + cube.slice(36, 39).join(" "));
    console.log("    " + cube.slice(12, 15).join(" ") + "  " + cube.slice(21, 24).join(" ") + "  " + cube.slice(30, 33).join(" ") + "  " + cube.slice(39, 42).join(" "));
    console.log("    " + cube.slice(15, 18).join(" ") + "  " + cube.slice(24, 27).join(" ") + "  " + cube.slice(33, 36).join(" ") + "  " + cube.slice(42, 45).join(" "));
    console.log("");
    console.log("           " + cube.slice(45, 48).join(" "));
    console.log("           " + cube.slice(48, 51).join(" "));
    console.log("           " + cube.slice(51, 54).join(" "));
    console.log(`[---------------------------${identifier}---------------------------]`)
}
export const wcaCube = (cube: RubiksCube) => getColoredCube(cube, WCA_COLOR_SCHEME)
export const printWCACube = (cube: RubiksCube, identifier: string = "") => print2DCube(wcaCube(cube), identifier);
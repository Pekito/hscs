import { CubeScheme, WCA_COLOR_SCHEME } from "../cube/Schemes";
import { RubiksCube, UnidimensionalCube } from "../cube/Types";
const getIndexColor = (scheme: CubeScheme, index: number) => {
    const faceIndex = Math.floor(index / 9);
    return scheme[faceIndex];
}
export const getColoredCube = (scheme: CubeScheme, cube: RubiksCube) => {
      return cube.map((_, index) => getIndexColor(scheme, cube[index]));
}
export const print2DCube = (cube: UnidimensionalCube<any>) => {
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
}
export const printWCACube = (cube: RubiksCube) => print2DCube(getColoredCube(WCA_COLOR_SCHEME, cube));
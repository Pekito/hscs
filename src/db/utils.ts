import fs from "fs";
import path from "path";
import { RubiksCube } from "../cube/Types";
import { RubiksCubeStateKey, RubiksCubeMoveNotationSequence } from "../solvers/Types";

export function writeJsonToFile(filePath: string, data: object): void {
    const jsonContent = JSON.stringify(data, null, 2);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing JSON to file:', err);
        } else {
            console.log('JSON file has been saved.');
        }
    });
}
export function createJsonLines(filePath: string): void {

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFile(filePath, '', 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing JSON to file:', err);
        } else {
            console.log('JSON file has been created.');
        }
    });
}
export async function appendJsonLineToFile(filePath: string, data: {[key: string]: any}) {
    console.log("Chamou append");
    const jsonLine = JSON.stringify(data) + '\n';
    try {
        await fs.promises.appendFile(filePath, jsonLine, 'utf8');
        console.log('JSON line has been appended.');
    } catch (err) {
        console.error('An error occurred while appending JSON to file:', err);
    }
}
export function loadJsonFile<T>(filename: string): T {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const json = JSON.parse(data);
        return json;
    } catch(error: any) {
        throw new Error(`Error loading JSON file ${error.message}`);
    }
}

export type StateHashTable = Record<string, RubiksCube>;
type SolutionHashTable = {[key: RubiksCubeStateKey]: RubiksCubeMoveNotationSequence};
export const loadStateHashTable = (filename: string) => loadJsonFile<StateHashTable>(path.join(__dirname, "states", `${filename}.json`))
export const loadSolutionHashTable = (filename: string)=> loadJsonFile<SolutionHashTable>(path.join(__dirname, "solutions", `${filename}.json`))
export const createWriteSolutionLine = (filename: string) => (solution: {[key: string]: string}) => appendJsonLineToFile(path.join(__dirname, "..", "db", "solutions", `${filename}.jsonl`), solution)
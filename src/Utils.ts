import * as fs from 'fs';
import * as path from 'path';
import { RubiksCube, RubiksCubeMove } from './cube/Types';
import { RubiksCubeMoveNotationSequence, RubiksCubeStateKey } from './solvers/Types';

export const getRandomObjectKey = <T>(obj: { [key: string]: T }): T => {
    const keys = Object.keys(obj);
    const randomKeyIndex = Math.floor(Math.random() * keys.length);
    return Object.values(obj)[randomKeyIndex];
}
export const areArraysEqual = <T>(a: Array<T> | ReadonlyArray<T>, b: Array<T> | ReadonlyArray<T>): boolean => 
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);

export const removeAtIndex = (index: number, array: Array<any>) => [...array.slice(0, index), ...array.slice(index + 1)];

export const range = (index: number) => Array.from({length: index}, (_, i) => i + 1);

export const removeArrayDuplicates = <T extends PropertyKey>(array: T[]): T[] => {
    const seen: { [key in T]?: boolean } = {};
    return array.filter((item) => {
        if (seen[item]) {
            return false;
        } else {
            seen[item] = true;
            return true;
        }
    });
}
export function chunkObject<T>(obj: {[key: string]: T}, numberOfChunks: number): any[] {
    const keys = Object.keys(obj);
    const totalKeys = keys.length;
    const chunkSize = Math.ceil(totalKeys / numberOfChunks);
    const result: Record<string, T>[] = [];

    for (let i = 0; i < totalKeys; i += chunkSize) {
        const chunk: Record<string, T> = {};
        keys.slice(i, i + chunkSize).forEach(key => {
            chunk[key] = obj[key];
        });
        result.push(chunk);
    }

    return result;
}
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

type StateHashTable = Record<string, RubiksCube>;
type SolutionHashTable = {[key: RubiksCubeStateKey]: RubiksCubeMoveNotationSequence};
export const loadStateHashTable = (filename: string) => loadJsonFile<StateHashTable>(path.join(__dirname, "..", "db", "states", `${filename}.json`))
export const loadSolutionHashTable = (filename: string)=> loadJsonFile<SolutionHashTable>(path.join(__dirname, "..", "db", "solutions", `${filename}.json`))
export const createWriteSolutionLine = (filename: string) => (solution: {[key: string]: string}) => appendJsonLineToFile(path.join(__dirname, "..", "db", "solutions", `${filename}.jsonl`), solution)
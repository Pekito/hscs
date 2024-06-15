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
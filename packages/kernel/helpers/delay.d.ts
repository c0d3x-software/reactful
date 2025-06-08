import '../extensions';
/** promise alternative to setTimeout */
export declare function delay(time: Time): Promise<void>;
/** promise alternative to setTimeout */
export declare function delay(time: number): Promise<void>;
/** promise alternative to setTimeout */
export declare function delay<T = any>(time: number, call: () => T): Promise<T>;
/** transform a string time format into millisecond number */
export declare function getMillisecondsFrom(value: number | Time): number;

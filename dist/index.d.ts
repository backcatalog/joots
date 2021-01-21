/// <reference types="node" />
import { HexBase64Latin1Encoding, BinaryLike } from "crypto";
/**
 * Removes duplicates from a given `array`.
 *
 * @param array
 */
export declare function dedupe(array: Array<any>): any[];
/**
 * Removes `needles` from the `haystack`.
 *
 * @param haystack
 * @param needles
 */
export declare function differ(haystack: Array<any>, needles: Array<any>): any[];
/**
 * Takes an `object` and removes properties that are not found in
 * `safeKeys`.
 *
 * @param object
 * @param safeKeys
 */
export declare function cleanObject(object: Record<string, any>, safeKeys: Array<string>): any;
/**
 * Creates a hash from a `buffer` using a given `algorithm`
 * and `encoding`.
 *
 * @param buffer
 * @param algorithm
 * @param encoding
 */
export declare function createHash(buffer: BinaryLike, algorithm?: string, encoding?: HexBase64Latin1Encoding): string;
/**
 * Salts and hashes an `unhashed` string.
 *
 */
export declare function hashString({ rounds, unhashed, callback, }: {
    rounds?: number;
    unhashed: string;
    callback: (err: any, hashed?: string) => any;
}): void;
export declare type verifyPasswordCallback = (err?: Error | null, isMatch?: boolean) => void;
/**
 * Compares a given `input` to a `hashed` string.
 *
 * @param input
 * @param hashed
 * @param callback
 */
export declare function verifyPassword(input: string, hashed: string, callback: verifyPasswordCallback): void;
/**
 * Compares a given `input` to a `hashed` string synchronously.
 *
 * @param input
 * @param hashed
 */
export declare function verifyPasswordSync(input: string, hashed: string): boolean;
/**
 * Makes sure the `limit` is less than or equal to `max` and not
 * a zero. Uses a `fallback` if both conditions are not met.
 *
 * @param limit
 * @param max
 * @param fallback
 */
export declare function normalizeLimit(limit: number, max?: number, fallback?: number): number;
/**
 * Takes an Express `reqQuery` object (i.e. req.query) and turns it
 * into a valid URI string.
 *
 * @param reqQuery
 */
export declare function assembleQuery(reqQuery: any): string;
/**
 * Assembles a mongoose query with a `param` that could potentially
 * be an "ObjectID". Used for endpoints that accept either an "_id" or
 * some other `altProperty` like "username".
 *
 * @param param
 * @param altProperty
 */
export declare function oidOr(param: string, altProperty?: string): any;
/**
 * Checks if `whatever` is defined. How lazy was I?
 *
 * @param whatever
 */
export declare function isDefined(whatever: any): boolean;
/**
 * @deprecated Use javascript's built-in `Array.prototype.forEach()`
 * method instead.
 *
 */
export declare function forEach(array: Array<any>, callback: any, _this: any): void;
/**
 * Merges two objects together. Properties from `object2`
 * overwrites ones from `object1`.
 *
 * @deprecated Use javascript's built-in `Object.assign()` method instead.
 * @param object1
 * @param object2
 */
export declare function merge(object1: any, object2: any): any;

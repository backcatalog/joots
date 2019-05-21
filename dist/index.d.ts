/// <reference types="node" />
import { HexBase64Latin1Encoding, BinaryLike } from "crypto";
export declare function merge(object1: any, object2: any): any;
export declare function dedupe(array: Array<any>): any[];
export declare function differ(haystack: Array<any>, needles: Array<any>): any[];
export declare function forEach(array: Array<any>, callback: any, _this: any): void;
export declare function createHash(buffer: BinaryLike, algorithm: string, encoding: HexBase64Latin1Encoding): string;
export declare function cleanObject(obj: any, safeKeys: Array<string>): any;
export declare function hashString({ rounds, unhashed, callback, }: {
    rounds?: number;
    unhashed: string;
    callback: (err: any, hashed?: string) => any;
}): void;
export declare function verifyPassword(input: string, hashed: string, callback: any): void;
export declare function verifyPasswordSync(input: string, hashed: string): boolean;
export declare function normalizeLimit(limit: number, max?: number, fallback?: number): number;
export declare function assembleQuery(reqQuery: any): string;
export declare function oidOr(param: string, altProperty?: string): any;
export declare function isDefined(property: any): boolean;

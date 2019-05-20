/// <reference types="node" />
import { HexBase64Latin1Encoding } from "crypto";
export declare function merge(object1: any, object2: any): any;
export declare function dedupe(array: Array<any>): any[];
export declare function differ(haystack: Array<any>, needles: Array<any>): any[];
export declare function forEach(array: Array<any>, callback: any, _this: any): void;
export declare function createHash(buffer: Buffer, hash: string, digest: HexBase64Latin1Encoding): string;
export declare function cleanObject(obj: any, safeKeys: Array<string>): any;
export declare function verifyPassword(input: string, actual: string, callback: any): void;
export declare function verifyPasswordSync(input: string, hashed: string): boolean;
export declare function normalizeLimit(limit: number, max?: number, fallback?: number): number;
export declare function assembleQuery(reqQuery: any): string;
export declare function oidOr(param: string, altProperty?: string): any;
export declare function isDefined(property: any): boolean;

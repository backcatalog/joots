import crypto, { HexBase64Latin1Encoding } from "crypto";
import bcrypt from "bcryptjs";

export function merge(object1: any, object2: any) {
    for (const prop in object2) {
        if (object2.hasOwnProperty(prop)) {
            object1[prop] = object2[prop];
        }
    }

    return object1;
}

export function dedupe(array: Array<any>) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}

export function differ(haystack: Array<any>, needles: Array<any>) {
    return haystack.filter(value => !needles.includes(value));
}

export function forEach(array: Array<any>, callback: any, _this: any) {
    for (let i = 0; i < array.length; i++) callback.call(_this, array[i], i);
}

export function createHash(
    buffer: Buffer,
    hash: string,
    digest: HexBase64Latin1Encoding
) {
    return crypto
        .createHash(hash || "sha256")
        .update(buffer)
        .digest(digest || "hex");
}

export function cleanObject(obj: any, safeKeys: Array<string>) {
    let output: any = {};

    for (let i = 0; i < safeKeys.length; i++) {
        if (obj.hasOwnProperty(safeKeys[i])) {
            output[safeKeys[i]] = obj[safeKeys[i]];
        }
    }

    return output;
}

export function verifyPassword(input: string, actual: string, callback: any) {
    bcrypt.compare(input, actual, (err: Error, isMatch: boolean) => {
        if (err) return callback(err);

        return callback(null, isMatch);
    });
}

export function verifyPasswordSync(input: string, hashed: string) {
    return bcrypt.compareSync(input, hashed);
}

export function normalizeLimit(limit: number, max = 40, fallback = 30) {
    limit = parseInt(limit.toString());

    return limit > 0 && limit <= max ? limit : fallback;
}

export function assembleQuery(reqQuery: any) {
    let queries = [];

    for (const prop in reqQuery) {
        if (reqQuery.hasOwnProperty(prop)) {
            queries.push(`${prop}=${reqQuery[prop]}`);
        }
    }

    return queries ? `?${queries.join("&")}` : "";
}

export function oidOr(param: string, altProperty = "username") {
    if (/^[a-fA-F0-9]{24}$/.test(param)) {
        return <any>{ $or: [{ _id: param }, { [altProperty]: param }] };
    } else {
        return <any>{ [altProperty]: param };
    }
}

export function isDefined(property: any) {
    return typeof property !== "undefined";
}

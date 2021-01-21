"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Removes duplicates from a given `array`.
 *
 * @param array
 */
function dedupe(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}
exports.dedupe = dedupe;
/**
 * Removes `needles` from the `haystack`.
 *
 * @param haystack
 * @param needles
 */
function differ(haystack, needles) {
    return haystack.filter((value) => !needles.includes(value));
}
exports.differ = differ;
/**
 * Takes an `object` and removes properties that are not found in
 * `safeKeys`.
 *
 * @param object
 * @param safeKeys
 */
function cleanObject(object, safeKeys) {
    let output = {};
    for (let i = 0; i < safeKeys.length; i++) {
        if (object.hasOwnProperty(safeKeys[i])) {
            output[safeKeys[i]] = object[safeKeys[i]];
        }
    }
    return output;
}
exports.cleanObject = cleanObject;
/**
 * Creates a hash from a `buffer` using a given `algorithm`
 * and `encoding`.
 *
 * @param buffer
 * @param algorithm
 * @param encoding
 */
function createHash(buffer, algorithm, encoding) {
    return crypto_1.default
        .createHash(algorithm || "sha256")
        .update(buffer)
        .digest(encoding || "hex");
}
exports.createHash = createHash;
/**
 * Salts and hashes an `unhashed` string.
 *
 */
function hashString({ rounds = 10, unhashed, callback, }) {
    bcryptjs_1.default.genSalt(rounds, (err, salt) => {
        if (err)
            return callback(err);
        bcryptjs_1.default.hash(unhashed, salt, (err, hashed) => {
            if (err)
                return callback(err);
            return callback(null, hashed);
        });
    });
}
exports.hashString = hashString;
/**
 * Compares a given `input` to a `hashed` string.
 *
 * @param input
 * @param hashed
 * @param callback
 */
function verifyPassword(input, hashed, callback) {
    bcryptjs_1.default.compare(input, hashed, (err, isMatch) => {
        if (err)
            return callback(err);
        return callback(null, isMatch);
    });
}
exports.verifyPassword = verifyPassword;
/**
 * Compares a given `input` to a `hashed` string synchronously.
 *
 * @param input
 * @param hashed
 */
function verifyPasswordSync(input, hashed) {
    return bcryptjs_1.default.compareSync(input, hashed);
}
exports.verifyPasswordSync = verifyPasswordSync;
/**
 * Makes sure the `limit` is less than or equal to `max` and not
 * a zero. Uses a `fallback` if both conditions are not met.
 *
 * @param limit
 * @param max
 * @param fallback
 */
function normalizeLimit(limit, max = 40, fallback = 30) {
    limit = parseInt(limit.toString());
    return limit > 0 && limit <= max ? limit : fallback;
}
exports.normalizeLimit = normalizeLimit;
/**
 * Takes an Express `reqQuery` object (i.e. req.query) and turns it
 * into a valid URI string.
 *
 * @param reqQuery
 */
function assembleQuery(reqQuery) {
    let queries = [];
    for (const prop in reqQuery) {
        if (reqQuery.hasOwnProperty(prop)) {
            queries.push(`${prop}=${reqQuery[prop]}`);
        }
    }
    return queries ? encodeURI(`?${queries.join("&")}`) : "";
}
exports.assembleQuery = assembleQuery;
/**
 * Assembles a mongoose query with a `param` that could potentially
 * be an "ObjectID". Used for endpoints that accept either an "_id" or
 * some other `altProperty` like "username".
 *
 * @param param
 * @param altProperty
 */
function oidOr(param, altProperty = "username") {
    if (/^[a-fA-F0-9]{24}$/.test(param)) {
        return { $or: [{ _id: param }, { [altProperty]: param }] };
    }
    else {
        return { [altProperty]: param };
    }
}
exports.oidOr = oidOr;
/**
 * Checks if `whatever` is defined. How lazy was I?
 *
 * @param whatever
 */
function isDefined(whatever) {
    return typeof whatever !== "undefined";
}
exports.isDefined = isDefined;
/**
 * @deprecated Use javascript's built-in `Array.prototype.forEach()`
 * method instead.
 *
 */
function forEach(array, callback, _this) {
    for (let i = 0; i < array.length; i++)
        callback.call(_this, array[i], i);
}
exports.forEach = forEach;
/**
 * Merges two objects together. Properties from `object2`
 * overwrites ones from `object1`.
 *
 * @deprecated Use javascript's built-in `Object.assign()` method instead.
 * @param object1
 * @param object2
 */
function merge(object1, object2) {
    for (const prop in object2) {
        if (object2.hasOwnProperty(prop)) {
            object1[prop] = object2[prop];
        }
    }
    return object1;
}
exports.merge = merge;
//# sourceMappingURL=index.js.map
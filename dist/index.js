"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function merge(object1, object2) {
    for (const prop in object2) {
        if (object2.hasOwnProperty(prop)) {
            object1[prop] = object2[prop];
        }
    }
    return object1;
}
exports.merge = merge;
function dedupe(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}
exports.dedupe = dedupe;
function differ(haystack, needles) {
    return haystack.filter((value) => !needles.includes(value));
}
exports.differ = differ;
function forEach(array, callback, _this) {
    for (let i = 0; i < array.length; i++)
        callback.call(_this, array[i], i);
}
exports.forEach = forEach;
function createHash(buffer, algorithm, encoding) {
    return crypto_1.default
        .createHash(algorithm || "sha256")
        .update(buffer)
        .digest(encoding || "hex");
}
exports.createHash = createHash;
function cleanObject(obj, safeKeys) {
    let output = {};
    for (let i = 0; i < safeKeys.length; i++) {
        if (obj.hasOwnProperty(safeKeys[i])) {
            output[safeKeys[i]] = obj[safeKeys[i]];
        }
    }
    return output;
}
exports.cleanObject = cleanObject;
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
function verifyPassword(input, hashed, callback) {
    bcryptjs_1.default.compare(input, hashed, (err, isMatch) => {
        if (err)
            return callback(err);
        return callback(null, isMatch);
    });
}
exports.verifyPassword = verifyPassword;
function verifyPasswordSync(input, hashed) {
    return bcryptjs_1.default.compareSync(input, hashed);
}
exports.verifyPasswordSync = verifyPasswordSync;
function normalizeLimit(limit, max = 40, fallback = 30) {
    limit = parseInt(limit.toString());
    return limit > 0 && limit <= max ? limit : fallback;
}
exports.normalizeLimit = normalizeLimit;
function assembleQuery(reqQuery) {
    let queries = [];
    for (const prop in reqQuery) {
        if (reqQuery.hasOwnProperty(prop)) {
            queries.push(`${prop}=${reqQuery[prop]}`);
        }
    }
    return queries ? `?${queries.join("&")}` : "";
}
exports.assembleQuery = assembleQuery;
function oidOr(param, altProperty = "username") {
    if (/^[a-fA-F0-9]{24}$/.test(param)) {
        return { $or: [{ _id: param }, { [altProperty]: param }] };
    }
    else {
        return { [altProperty]: param };
    }
}
exports.oidOr = oidOr;
function isDefined(property) {
    return typeof property !== "undefined";
}
exports.isDefined = isDefined;
//# sourceMappingURL=index.js.map
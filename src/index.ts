import crypto, { HexBase64Latin1Encoding, BinaryLike } from "crypto";
import bcrypt from "bcryptjs";

/**
 * Removes duplicates from a given `array`.
 *
 * @param array
 */
export function dedupe(array: Array<any>) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}

/**
 * Removes `needles` from the `haystack`.
 *
 * @param haystack
 * @param needles
 */
export function differ(haystack: Array<any>, needles: Array<any>) {
  return haystack.filter((value) => !needles.includes(value));
}

/**
 * Takes an `object` and removes properties that are not found in
 * `safeKeys`.
 *
 * @param object
 * @param safeKeys
 */
export function cleanObject(
  object: Record<string, any>,
  safeKeys: Array<string>
) {
  let output: any = {};

  for (let i = 0; i < safeKeys.length; i++) {
    if (object.hasOwnProperty(safeKeys[i])) {
      output[safeKeys[i]] = object[safeKeys[i]];
    }
  }

  return output;
}

/**
 * Creates a hash from a `buffer` using a given `algorithm`
 * and `encoding`.
 *
 * @param buffer
 * @param algorithm
 * @param encoding
 */
export function createHash(
  buffer: BinaryLike,
  algorithm?: string,
  encoding?: HexBase64Latin1Encoding
) {
  return crypto
    .createHash(algorithm || "sha256")
    .update(buffer)
    .digest(encoding || "hex");
}

/**
 * Salts and hashes an `unhashed` string.
 *
 */
export function hashString({
  rounds = 10,
  unhashed,
  callback,
}: {
  rounds?: number;
  unhashed: string;
  callback: (err: any, hashed?: string) => any;
}) {
  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(unhashed, salt, (err, hashed) => {
      if (err) return callback(err);

      return callback(null, hashed);
    });
  });
}

export type verifyPasswordCallback = (
  err?: Error | null,
  isMatch?: boolean
) => void;

/**
 * Compares a given `input` to a `hashed` string.
 *
 * @param input
 * @param hashed
 * @param callback
 */
export function verifyPassword(
  input: string,
  hashed: string,
  callback: verifyPasswordCallback
) {
  bcrypt.compare(input, hashed, (err: Error, isMatch: boolean) => {
    if (err) return callback(err);

    return callback(null, isMatch);
  });
}

/**
 * Compares a given `input` to a `hashed` string synchronously.
 *
 * @param input
 * @param hashed
 */
export function verifyPasswordSync(input: string, hashed: string) {
  return bcrypt.compareSync(input, hashed);
}

/**
 * Makes sure the `limit` is less than or equal to `max` and not
 * a zero. Uses a `fallback` if both conditions are not met.
 *
 * @param limit
 * @param max
 * @param fallback
 */
export function normalizeLimit(limit: number, max = 40, fallback = 30) {
  limit = parseInt(limit.toString());

  return limit > 0 && limit <= max ? limit : fallback;
}

/**
 * Takes an Express `reqQuery` object (i.e. req.query) and turns it
 * into a valid URI string.
 *
 * @param reqQuery
 */
export function assembleQuery(reqQuery: any) {
  let queries = [];

  for (const prop in reqQuery) {
    if (reqQuery.hasOwnProperty(prop)) {
      queries.push(`${prop}=${reqQuery[prop]}`);
    }
  }

  return queries ? encodeURI(`?${queries.join("&")}`) : "";
}

/**
 * Assembles a mongoose query with a `param` that could potentially
 * be an "ObjectID". Used for endpoints that accept either an "_id" or
 * some other `altProperty` like "username".
 *
 * @param param
 * @param altProperty
 */
export function oidOr(param: string, altProperty = "username") {
  if (/^[a-fA-F0-9]{24}$/.test(param)) {
    return <any>{ $or: [{ _id: param }, { [altProperty]: param }] };
  } else {
    return <any>{ [altProperty]: param };
  }
}

/**
 * Checks if `whatever` is defined. How lazy was I?
 *
 * @param whatever
 */
export function isDefined(whatever: any) {
  return typeof whatever !== "undefined";
}

/**
 * @deprecated Use javascript's built-in `Array.prototype.forEach()`
 * method instead.
 *
 */
export function forEach(array: Array<any>, callback: any, _this: any) {
  for (let i = 0; i < array.length; i++) callback.call(_this, array[i], i);
}

/**
 * Merges two objects together. Properties from `object2`
 * overwrites ones from `object1`.
 *
 * @deprecated Use javascript's built-in `Object.assign()` method instead.
 * @param object1
 * @param object2
 */
export function merge(object1: any, object2: any) {
  for (const prop in object2) {
    if (object2.hasOwnProperty(prop)) {
      object1[prop] = object2[prop];
    }
  }

  return object1;
}

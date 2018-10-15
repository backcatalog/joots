const bcrypt = require('bcryptjs');

const merge = exports.merge = (object1, object2) => {
    for(const prop in object2) {
        if(object2.hasOwnProperty(prop)) object1[prop] = object2[prop];
    }

    return object1;
};

const dedupe = exports.dedupe = (array) => {
    return array.filter((value, index, self) => self.indexOf(value) === index);
};

const differ = exports.differ = (haystack, needles) => {
    return haystack.filter(value => !needles.includes(value));
};

const forEach = exports.forEach = (array, callback, _this) => {
    for(let i = 0; i < array.length; i++) callback.call(_this, array[i], i);
};

const cleanObject = exports.cleanObject = (obj, safeKeys) => {
    let output = {};

    for(let i = 0; i < safeKeys.length; i++) {
        if(obj.hasOwnProperty(safeKeys[i])) {
            output[safeKeys[i]] = obj[safeKeys[i]];
        }
    }

    return output;
};

const verifyPassword = exports.verifyPassword = (input, actual, next) => {
    bcrypt.compare(input, actual, (err, isMatch) => {
        if(err) return next(err);

        return next(null, isMatch);
    });
};

const verifyPasswordSync = exports.verifyPasswordSync = (input, hashed) => {
    return bcrypt.compareSync(input, hashed);
};

const normalizeLimit = exports.normalizeLimit = (reqLimit, max = 40, fallback = 30) => {
    reqLimit = parseInt(reqLimit);

    return (reqLimit > 0 && reqLimit <= max) ? reqLimit : fallback;
};

const assembleQuery = exports.assembleQuery = (queryObject) => {
    let queries = [];

    for(const prop in queryObject) {
        if(queryObject.hasOwnProperty(prop)) queries.push(`${prop}=${queryObject[prop]}`);
    }

    return (queries) ? `?${queries.join('&')}` : '';
};

const oidOr = exports.oidOr = (value, altProperty = 'username') => {
    if(/^[a-fA-F0-9]{24}$/.test(value)) {
        return {$or: [{_id: value}, {[altProperty]: value}]};
    } else {
        return {[altProperty]: value};
    }
};

const isDefined = exports.isDefined = variable => typeof variable !== 'undefined';

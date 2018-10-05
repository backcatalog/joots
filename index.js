const normalizeLimit = exports.normalizeLimit = (reqLimit, max = 40, fallback = 30) => {
    reqLimit = parseInt(reqLimit);

    return (reqLimit > 0 && reqLimit <= max) ? reqLimit : fallback;
};

const merge = exports.merge = (object1, object2) => {
    for(const prop in object2) {
        if(object2.hasOwnProperty(prop)) object1[prop] = object2[prop];
    }

    return object1;
};

const assembleQuery = exports.assembleQuery = (queryObject) => {
    let queries = [];

    for(const prop in queryObject) {
        if(queryObject.hasOwnProperty(prop)) queries.push(`${prop}=${queryObject[prop]}`);
    }

    return (queries) ? `?${queries.join('&')}` : '';
};

const { openSync, readFileSync, writeSync } = require('fs');
const path = require('path');
const hash = require('object-hash');

const getCacheKey = (path, params = {}) => {
  const name = path.replace(new RegExp('/', 'g'), '_');
  return `${name}_${hash(params)}`;
};

const getCachePath = (cacheKey) => `${path.resolve(path.join(__dirname, '../data'))}/${cacheKey}.json`;

const writeCache = (cacheKey, data) => {
  try {
    const id = openSync(getCachePath(cacheKey), 'w');
    writeSync(id, JSON.stringify(data));
  } catch (err) {
    console.log({ err });
  }
};

const getCache = (cacheKey) => {
  try {
    const data = readFileSync(getCachePath(cacheKey));
    return JSON.parse(data);
  } catch {
    return false;
  }
};

module.exports = { writeCache, getCache, getCacheKey };

const axios = require('axios');
const crypto = require('crypto');
const Cache = require('../services/Cache');

const request = async ({ path, params }) => {
  const cacheKey = Cache.getCacheKey(path, params);
  const cache = await Cache.getCache(cacheKey);
  if (cache) return cache;

  try {
    const { data } = await axios.get(`${process.env.BINANCE_API_URL}${path}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
      },
    });
    Cache.writeCache(cacheKey, data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const buildQueryString = params => {
  if (!params) return '';
  return Object.entries(params)
    .map(stringifyKeyValuePair)
    .join('&');
};

const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value;
  return `${key}=${encodeURIComponent(valueString)}`;
};

const signRequest = ({ path, params }, isPublic = false) => {
  const timestamp = Date.now();
  const queryString = buildQueryString({ ...params, timestamp });
  const signature = crypto
    .createHmac('sha256', process.env.BINANCE_SECRET_KEY)
    .update(queryString)
    .digest('hex');

  return request({ path, params: { ...params, timestamp, signature } });
};

/**
 * Account Information (USER_DATA)<br>
 * GET /binance/account<br>
 *
 * {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data}
 */
const getAccount = () => signRequest({ path: '/api/v3/account' });

/**
 * Exchange Information
 * GET /binance/exchange-info
 *
 * Current exchange trading rules and symbol information<br>
 * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
 *
 */
const getExchangeInfo = async () => {
  try {
    return request({ path: '/api/v3/exchangeInfo' });
  } catch (err) {
    console.log(err);
  }
};

const getKLines = async (params) => {
  try {
    return request({ path: '/api/v3/klines', params });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAccount, getExchangeInfo, getKLines };

const axios = require('axios');
const crypto = require('crypto');

const createRequest = ({ path, params }) => {
  return axios.get(`${process.env.BINANCE_API_URL}${path}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
    },
  });
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
  const queryString = buildQueryString(params);
  const signature = crypto
    .createHmac( 'sha256', process.env.BINANCE_SECRET_KEY)
    .update(queryString)
    .digest('hex');

  return createRequest({ path, params: { ...params, signature } })
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
const getExchangeInfo = () => createRequest({ path: '/api/v3/exchangeInfo' });

module.exports = { getAccount, getExchangeInfo };

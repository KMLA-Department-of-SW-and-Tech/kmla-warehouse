// all predefined constants here
/* const COOKIE_LIFETIME = 24 * 60 * 60 * 1000; // (ms)
const REFRESH_LIFETIME = '1d';
const ACCESS_LIFETIME = '5min'; */

const COOKIE_LIFETIME = 60 * 1000; // (ms)
const REFRESH_LIFETIME = '1min';
const ACCESS_LIFETIME = '30s';


module.exports = { COOKIE_LIFETIME, REFRESH_LIFETIME, ACCESS_LIFETIME };
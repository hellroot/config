/**
 * @type { import('@hellroot/config').IConfigPart }
 */
const config = {
  debug: process.env.DEBUG === '1',
  version: process.env.VERSION || 'dev',
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;

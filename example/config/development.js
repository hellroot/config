/**
 * @type { import('@hellroot/config').IConfigPart }
 */
const config = {
  backend: {
    baseUrl: 'https://api-test.weather.yandex.ru/v1/'
  },

  server: {
    port: 8080
  }
};

module.exports = config;

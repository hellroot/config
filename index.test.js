const path = require('path');

const testModule = path.resolve('./index');
const fixturesDir = path.resolve(__dirname, 'fixtures');

describe('config object', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.NODE_ENV;
    delete process.env.CONFIG_ENV;
    delete process.env.CONFIG_DIR;
  });

  test('should throw error if module is invalid', () => {
    process.env.CONFIG_DIR = path.join(fixturesDir, 'invalid');

    try {
      require(testModule);
    } catch (err) {
      expect(err.message).toBe('Not a config');
    }
  });

  test('should be empty if config directory is empty', () => {
    process.env.NODE_ENV = 'development';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'empty');

    const config = require(testModule);

    expect(config).toEqual({});
  });

  test('should return default config', () => {
    process.env.NODE_ENV = 'development';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'default');

    const config = require(testModule);

    expect(config).toEqual({
      backend: {
        baseUrl: 'https://api.weather.yandex.ru/v1/'
      },

      logger: {
        level: 'info'
      },

      server: {
        port: 8080
      }
    });
  });

  test('should return default config extended by env config', () => {
    process.env.NODE_ENV = 'development';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'env');

    const config = require(testModule);

    expect(config).toEqual({
      backend: {
        baseUrl: 'https://dev-api.weather.yandex.ru/v1/'
      },

      logger: {
        level: 'info'
      },

      server: {
        port: 8080
      },

      static: {
        baseUrl: '/static'
      }
    });
  });

  test('should prefer CONFIG_ENV over NODE_ENV', () => {
    process.env.NODE_ENV = 'development';
    process.env.CONFIG_ENV = 'production';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'env');

    const config = require(testModule);

    expect(config).toEqual({
      backend: {
        baseUrl: 'https://api.weather.yandex.ru/v1/'
      },

      logger: {
        level: 'info'
      },

      server: {
        port: 8080
      },

      static: {
        baseUrl: 'http://weather.website.yandexcloud.net/static/'
      }
    });
  });

  test('should override other configs by local config', () => {
    process.env.NODE_ENV = 'development';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'local');

    const config = require(testModule);

    expect(config).toEqual({
      backend: {
        baseUrl: 'http://127.0.0.1:8000/v1/'
      },

      logger: {
        level: 'info'
      },

      server: {
        port: 8080
      },

      static: {
        baseUrl: '/static'
      }
    });
  });

  test('should not serialize configs', () => {
    process.env.NODE_ENV = 'testing';
    process.env.CONFIG_DIR = path.join(fixturesDir, 'serialization');

    const config = require(testModule);

    expect(config.someError.message).toEqual('Wake up, Neo');
    expect(config.someObject.sayWakeUp()).toEqual('Wake up, Neo');
  });
});

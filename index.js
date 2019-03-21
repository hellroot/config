const path = require('path');

const mergeOptions = require('merge-options');

const ENV = process.env.NODE_ENV;
const CONFIG_DIR = process.env.CONFIG_DIR || path.join(process.cwd(), 'config');

/**
 * @param {string} configDir - Directory where configs are stored.
 * @param {string} configFile - Config file to load.
 * @param {boolean} warn - Show warning if file failed to load.
 */
function loadConfig(configDir, configFile, warn) {
  let config = {};

  try {
    config = require(path.join(configDir, configFile));
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    }

    if (warn) {
      console.warn(`Could not load ${configFile} config`);
    }
  }

  return config;
}

const defaultConfig = loadConfig(CONFIG_DIR, 'default', true);
const environmentConfig = ENV ? loadConfig(CONFIG_DIR, ENV, true) : {};
const localConfig = ENV === 'local' ? {} : loadConfig(CONFIG_DIR, 'local', false);

module.exports = {
  config: mergeOptions(defaultConfig, environmentConfig, localConfig)
};

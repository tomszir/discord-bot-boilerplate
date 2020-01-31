const fs = require('fs');
const path = require('path');

const DEFAULT_PATH = path.join(__dirname, '/config/default.json');
const DEVELOPMENT_PATH = path.join(__dirname, '/config/development.json');
const PRODUCTION_PATH = path.join(__dirname, '/config/production.json');

const env = process.env.NODE_ENV.toLowerCase();

function getConfig() {
  if (env == 'development') if (fs.existsSync(DEVELOPMENT_PATH)) return require(DEVELOPMENT_PATH);
  if (env === 'production') if (fs.existsSync(PRODUCTION_PATH)) return require(PRODUCTION_PATH);
  if (fs.existsSync(DEFAULT_PATH)) return require(DEFAULT_PATH);
  return {};
}

module.exports = {
  get(path, def = null) {
    let result = getConfig();

    path.split('.').forEach(key => {
      if (!(result instanceof Object)) return result;
      if (result.hasOwnProperty(key)) {
        result = result[key];
      } else {
        result = def;
      }
    });

    return result;
  },

  getConfig() {
    return getConfig();
  }
};

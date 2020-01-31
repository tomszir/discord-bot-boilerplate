const fs = require('fs');
const path = require('path');

const logger = require('@/logger');

module.exports = {
  load(client, dir) {
    const loaded = [];
    const errors = [];

    if (!fs.existsSync(dir)) {
      logger.error('[EventLoader] Specified directory does not exist!', {
        dir
      });

      return [];
    }

    fs.readdirSync(dir)
      .filter(f => f.endsWith('.js') && !f.startsWith('__'))
      .forEach(file => {
        try {
          const eventName = file.replace('.js', '');
          const eventFile = require(path.join(dir, file));

          loaded.push(eventName);
          client.on(eventName, eventFile(client));
        } catch (err) {
          errors.push({
            message: err.message,
            filename: file
          });
        }
      });

    logger.info(`[EventLoader] Successfully loaded events:`, {
      amount: loaded.length,
      loaded: loaded
    });

    if (errors.length > 0) {
      logger.error('[EventLoader] Some errors have occured while loading events:', {
        amount: errors.length,
        errors: errors
      });
    }

    return loaded;
  }
};

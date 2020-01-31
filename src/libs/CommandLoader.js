const fs = require('fs');
const path = require('path');

const logger = require('@/logger');

module.exports = {
  load(dir) {
    const loaded = [];
    const errors = [];

    if (!fs.existsSync(dir)) {
      logger.error('[CommandLoader] Specified directory does not exist!', {
        dir
      });

      return [];
    }

    fs.readdirSync(dir)
      .filter(f => !f.endsWith('.js'))
      .forEach(group => {
        fs.readdirSync(path.join(dir, group))
          .filter(f => f.endsWith('.js') && !f.startsWith('__'))
          .forEach(file => {
            try {
              const Command = require(path.join(dir, group, file));

              if (!Command) throw new Error('No constructor could be found in the commandFile.');

              const command = new Command();

              command.group = group;

              loaded.push(command);
            } catch (err) {
              errors.push({
                filename: `${group}/${file}`,
                message: err.message
              });
            }
          });
      });

    logger.info(`[CommandLoader] Successfully loaded commands:`, {
      amount: loaded.length,
      loaded: loaded.map(c => c.fullName)
    });

    if (errors.length > 0) {
      logger.error('[CommandLoader] Some errors have occured while loading commands:', {
        amount: errors.length,
        errors: errors
      });
    }

    return loaded;
  }
};

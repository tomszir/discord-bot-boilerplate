const logger = require('@/logger');

module.exports = client => {
  return () => {
    logger.info(`The '${client.user.username}#${client.user.discriminator}' client is ready!`);
  };
};

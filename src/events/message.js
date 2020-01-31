const config = require('@config');

module.exports = client => {
  return message => {
    if (message.author.bot) return;

    // TODO: Implement by-guild system.
    const prefix = config.discord.prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.split(/ /);
    const commandName = args.shift().substring(prefix.length);
    const command = client.findCommand(commandName);

    if (!command) return;

    client.emit('command', command, message, args);
  };
};

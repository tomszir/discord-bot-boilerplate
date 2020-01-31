const CommandContext = require('@/libs/commands/CommandContext');

const logger = require('@/logger');

async function getValidatedArguments(command, userArgs) {
  const args = {};

  for (let i = 0; i < command.arguments.length; i++) {
    const arg = userArgs[i];
    const argument = command.arguments[i];

    if (!arg) break;

    const valid = argument.validate ? await argument.validate({ client, value: arg }) : true;

    if (!valid) break;

    if (argument.joined) {
      args[argument.name] = args.slice(i, command.arguments.length).join(' ');
      break;
    }

    args[argument.name] = arg;
  }

  return args;
}

module.exports = client => {
  return async (command, message, userArgs) => {
    const ctx = new CommandContext({ client, message });
    const args = await getValidatedArguments(command, userArgs);

    if (!ctx.member.hasPermission('ADMINISTRATOR')) {
      const missingRoles = [];

      command.roles.forEach(role => {
        if (!ctx.member.roles.map(r => r.name).includes(role)) {
          missingRoles.push(role);
        }
      });

      if (missingRoles.length > 0) {
        // ...
      }
    }

    if (command.developerOnly) {
      if (!config.developers.includes(ctx.author.id)) {
        // ...
      }
    }

    try {
      command.execute(ctx, args);
    } catch (error) {
      logger.error(`An error has occured while executing command: '${command.fullName}'`, {
        error
      });
    }
  };
};

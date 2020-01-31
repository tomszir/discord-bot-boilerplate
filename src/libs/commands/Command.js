function validateOptions(options = {}) {
  if (!(options instanceof Object)) throw Error('Command options must be an Object.');
  if (!options.name) throw Error('You must provide a name to the Command options.');
}

module.exports = class Command {
  constructor(options = {}) {
    validateOptions(options);

    // The unique identifier of this command.
    this.identifier = options.identifier || options.name;

    // The command name and identifier.
    this.name = options.name;

    // The command group of this command.
    this.group = options.group || null;

    // Aliases that can be used instead of the command name.
    this.aliases = options.aliases || [];

    // Command arguments that can be specified.
    this.arguments = options.arguments || [];

    // Required permissions for this command to be run.
    this.permissions = options.permissions || [];

    // Required roles to run the command.
    this.roles = options.roles || [];

    // The long description of the command.
    this.description = options.description || 'No description has been provided for this command.';

    // Is this command only usable in a guild.
    this.guildOnly = options.guildOnly || true;

    // Is this command only usable by the developer.
    this.developerOnly = options.developerOnly || false;

    // Whether this command is guarded against being disabled.
    this.guarded = options.guarded || true;

    this.disabled = options.disabled || false;

    this.hidden = options.hidden || false;

    // TODO: Implement timeout feature.
    // this.timeouts = [];
  }

  execute(ctx, args) {
    ctx.send('This command does not have an executor function.');
  }

  get fullName() {
    return `${this.group}/${this.name}`;
  }

  /*
  static sendErrorMessage(ctx, message) {
    const embed = new Discord.RichEmbed().setColor(0xff0000).setDescription(message);

    ctx.channel.send(embed);
  }

  static validateOptions(options = {}) {
    if (!(options instanceof Object)) throw Error('Command options must be an Object.');
    if (!options.name) throw Error('You must define a command name.');
  }
  */
};

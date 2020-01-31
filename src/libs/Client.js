const path = require('path');
const Discord = require('discord.js');

const EventLoader = require('@/libs/EventLoader');
const CommandLoader = require('@/libs/CommandLoader');

module.exports = class extends Discord.Client {
  constructor() {
    super();

    this.events = EventLoader.load(this, path.join(__dirname, '../events'));
    this.commands = CommandLoader.load(path.join(__dirname, '../commands'));
  }

  findCommand(identifier) {
    return this.commands.find(c => c.name === identifier);
  }
};

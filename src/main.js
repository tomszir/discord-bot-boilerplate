const Client = require('@/libs/Client');
const config = require('@config');
const client = new Client();

client.login(config.get('discord.token'));

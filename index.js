const CustomClient = require('./src/client/Client');
const config = require('./config');
const path = require('path');

const client = new CustomClient();

client.loadCommands(path.join(__dirname, 'src', 'commands'));

client.loadEvents(path.join(__dirname, 'src', 'events', 'client'));
client.loadEvents(path.join(__dirname, 'src', 'events', 'guild'));

client.login(config.token);
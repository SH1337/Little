const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require('../../../config');

module.exports = {
    name: 'message',
    async execute(message) {
        if (message.content.startsWith(config.prefix) && !message.author.bot) {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (command) {
                try {
                    await command.execute(message, args);
                } catch (error) {
                    console.error(error);
                    message.reply('Il y a eu une erreur en exécutant cette commande.');
                }
            }
        }
    },
};
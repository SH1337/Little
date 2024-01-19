const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

class CustomClient extends Client {
  constructor(options = {}) {
    super({
      ...options,
      intents: 3276799 
    });
    this.commands = new Collection();
    this.snipes = new Collection();
  }
  loadCommands(commandPath) {
    const readCommands = dir => {
      const files = fs.readdirSync(path.join(commandPath, dir));

      for (const file of files) {
        const stat = fs.lstatSync(path.join(commandPath, dir, file));
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file));
        } else if (file.endsWith('.js')) {
          const command = require(path.join(commandPath, dir, file));
          this.commands.set(command.name, command);
        }
      }
    };

    readCommands('.');
  }

  loadEvents(eventPath) {
    const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const filePath = path.join(eventPath, file);
      const event = require(filePath);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args, this));
      } else {
        this.on(event.name, (...args) => event.execute(...args, this));
      }
    }
  }
}

module.exports = CustomClient;
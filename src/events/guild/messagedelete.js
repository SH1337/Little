// events/guild/messageDelete.js
const { Client } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = (client, message) => {
 
  if (message.author.bot) return;

  
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
  });
};

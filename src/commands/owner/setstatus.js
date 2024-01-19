// commands/owner/setco.js
const { MessageEmbed } = require('discord.js');
const { buyeurKey } = require('../../../config');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: 'setstatus',
  description: 'Mettre le bot en ligne, inactif ou ne pas déranger',
  usage: '<status>',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de changer le statut du bot.');
    }

   
    if (args.length !== 1) {
      return message.reply('Veuillez fournir le statut (online, idle, dnd).');
    }

   
    const status = args[0].toLowerCase();

    
    if (!['online', 'idle', 'dnd'].includes(status)) {
      return message.reply('Statut invalide. Utilisez l\'un des suivants : online, idle, dnd.');
    }

    
    message.client.user.setStatus(status);

    
    const embed = new MessageEmbed()
      .setColor(2829617) // Vert
      // .setTitle('Statut mis à jour')
      .setDescription(`Le statut du bot a été mis à jour : \`${status.toUpperCase()}\``)
      .setFooter(`${message.client.user.username}`)
      .setTimestamp();

    
    message.channel.send({ embeds: [embed] });
  },
};

async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}

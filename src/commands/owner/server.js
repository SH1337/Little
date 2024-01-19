const { MessageEmbed } = require('discord.js');
const { buyeurKey } = require('../../../config');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: 'server',
  description: 'Affiche la liste des serveurs et leur nombre de membres',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de changer le statut du bot.');
    }

    
    if (!message.guild) {
      return message.reply('Cette commande doit être exécutée dans un serveur.');
    }

    
    const member = message.guild.members.cache.get(message.author.id);

   
    if (!member || !member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    
    const serverInfo = message.client.guilds.cache.map(guild => `${guild.name} | \`${guild.id}\` - Membres: ${guild.memberCount}`);

    
    const serverEmbed = new MessageEmbed()
      .setColor(2829617)
      .setTitle('Liste des serveurs et leur nombre de membres')
      .setDescription(serverInfo.join('\n'));

   
    message.channel.send({ embeds: [serverEmbed] });
  },
};

async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}

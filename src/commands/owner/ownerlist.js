// commands/ownerslist.js
const { ownersKey } = require('../../../config'); 
const { buyeurKey } = require('../../../config');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ownerslist',
  description: 'Affiche la liste des owners.',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de voir la liste des owners.');
    }

    const owners = await getBotOwners();

    const embed = new MessageEmbed()
      .setColor(2829617)
      .setTitle('Liste des owners')
      .setDescription(owners.map(ownerId => `<@${ownerId}> |  \`${ownerId}\``).join('\n'));

    
    message.reply({ embeds: [embed] });
  },
};

async function isBotOwner(userId) {
  const owners = await db.get(ownersKey) || [];
  return owners.includes(userId);
}

async function getBotOwners() {
  return await db.get(ownersKey) || [];
}
async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}
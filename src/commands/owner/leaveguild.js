const { MessageEmbed } = require('discord.js');
// const config = require('../../../config');
const { buyeurKey } = require('../../../config');
module.exports = {
  name: 'leaveguild',
  description: 'Faire quitter le bot d\'un serveur en utilisant son ID',
  usage: '<ID du serveur>',
  // execute(message, args) {
 
  //   if (message.author.id !== config.ownerID) {
 
  //   }
  async execute(message, args) {
   
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }
    
    const guildId = args[0];

    
    if (!guildId) {
      return message.reply('Veuillez fournir l\'ID du serveur à quitter.');
    }

    
    message.client.guilds.fetch(guildId)
      .then(guild => {
        
        if (guild) {
          
          guild.leave();
          message.reply(`Je viens de quitté avec succès le serveur avec l'ID: ${guild.id}`);
        } else {
          message.reply('Je suis pas présent dans ce serveur.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la tentative de quitter le serveur :', error);
        message.reply('Une erreur s\'est produite lors de la tentative de quitter le serveur.');
      });
  },
};

async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}
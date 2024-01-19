// commands/unban.js
const { Permissions } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Débannir un utilisateur',
  usage: '<utilisateur ID>',
  permissions: [Permissions.FLAGS.BAN_MEMBERS],

  async execute(message, args) {
    
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return message.reply('Vous n\'avez pas la permission de débannir des membres.');
    }

   
    const userID = args[0];

   
    if (!userID) {
      return message.reply('Veuillez spécifier l\'ID de l\'utilisateur à débannir.');
    }

  
    try {
      await message.guild.bans.remove(userID);
      message.reply(`L'utilisateur avec l'ID \`${userID}\` a été débanni avec succès.`);
    } catch (error) {
      console.error('Erreur lors du débanissement de l\'utilisateur :', error);
      message.reply('Une erreur s\'est produite lors du débanissement de l\'utilisateur.');
    }
  },
};

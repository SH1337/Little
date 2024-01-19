// commands/kick.js
const { Permissions } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Expulser un utilisateur du serveur',
  usage: '<utilisateur> [raison]',
  permissions: [Permissions.FLAGS.KICK_MEMBERS],

  async execute(message, args) {
    
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply('Vous n\'avez pas la permission d\'expulser des membres.');
    }


    const targetUser = message.mentions.users.first();

    
    if (!targetUser) {
      return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez expulser.');
    }

    
    const targetMember = message.guild.members.cache.get(targetUser.id);

    
    if (!targetMember) {
      return message.reply('Cet utilisateur n\'est pas membre du serveur.');
    }

    
    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply('Je n\'ai pas la permission d\'expulser des membres.');
    }

    
    try {
      await targetMember.kick(args.slice(1).join(' ') || 'Aucune raison spécifiée.');
      message.reply(`L'utilisateur ${targetUser.tag} a été expulsé.`);
    } catch (error) {
      console.error('Erreur lors de l\'expulsion de l\'utilisateur :', error);
      message.reply('Une erreur s\'est produite lors de l\'expulsion de l\'utilisateur.');
    }
  },
};

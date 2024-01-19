const { Permissions } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Unmute un utilisateur',
  usage: '<utilisateur>',

  async execute(message, args) {
    
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES) || !message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return message.reply('Vous n\'avez pas la permission de gérer les rôles ou les salons.');
    }

    
    const targetUser = message.mentions.users.first();

   
    if (!targetUser) {
      return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez unmute.');
    }

   
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    
    if (!muteRole) {
      return message.reply('Le rôle Muted n\'existe pas. Aucun utilisateur n\'est actuellement mute.');
    }

    
    const targetMember = await message.guild.members.fetch(targetUser.id)
      .catch(error => {
        console.error('Erreur lors de la récupération du membre :', error);
        return message.reply('Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur.');
      });

    
    if (!targetMember) {
      return message.reply('Cet utilisateur n\'est pas membre du serveur.');
    }

    
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.reply('Je n\'ai pas la permission de gérer les rôles.');
    }

   
    targetMember.roles.remove(muteRole)
      .then(() => {
        message.reply(`L'utilisateur ${targetUser.tag} a été unmute.`);

        
        message.guild.channels.cache.forEach(channel => {
          if (channel.type === 'GUILD_TEXT') {
            channel.permissionOverwrites.edit(muteRole, { SEND_MESSAGES: null });
          }
        });
      })
      .catch(error => {
        console.error('Erreur lors du démuting de l\'utilisateur :', error);
        message.reply('Une erreur s\'est produite lors du démuting de l\'utilisateur.');
      });
  },
};

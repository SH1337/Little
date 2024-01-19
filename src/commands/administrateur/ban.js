// commands/ban.js
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bannir un utilisateur',
  usage: '<utilisateur> [raison]',
  permissions: [Permissions.FLAGS.BAN_MEMBERS],

  execute(message, args) {
   
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const noBotPermissionEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur de Permission')
        .setDescription('Je n\'ai pas la permission de bannir des membres.');

      return message.reply({ embeds: [noBotPermissionEmbed] });
    }

    
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      const noUserPermissionEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur de Permission')
        .setDescription('Vous n\'avez pas la permission de bannir des membres.');

      return message.reply({ embeds: [noUserPermissionEmbed] });
    }

   
    const targetUser = message.mentions.users.first();

    
    if (!targetUser) {
      const noUserMentionedEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur d\'Utilisateur')
        .setDescription('Veuillez mentionner l\'utilisateur que vous souhaitez bannir.');

      return message.reply({ embeds: [noUserMentionedEmbed] });
    }

   
    const targetMember = message.guild.members.cache.get(targetUser.id);

   
    if (!targetMember) {
      const notInServerEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur d\'Utilisateur')
        .setDescription('Cet utilisateur n\'est pas membre du serveur.');

      return message.reply({ embeds: [notInServerEmbed] });
    }

    
    const banReason = args.slice(1).join(' ');

   
    targetMember.ban({ reason: banReason })
      .then(bannedUser => {
        const banSuccessEmbed = new MessageEmbed()
          .setColor(2829617)
          .setTitle('Utilisateur Banni')
          .setDescription(`L'utilisateur \`${bannedUser.id}\` a été banni. Il a ete banni pour \`${banReason || 'Aucune raison spécifiée'}\` `)

        message.reply({ embeds: [banSuccessEmbed] });
      })
      .catch(error => {
        console.error('Erreur lors du bannissement :', error);

        const banErrorEmbed = new MessageEmbed()
          .setColor(2829617)
          .setTitle('Erreur de Bannissement')
          .setDescription('Une erreur s\'est produite lors du bannissement de l\'utilisateur.');

        message.reply({ embeds: [banErrorEmbed] });
      });
  },
};

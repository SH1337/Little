// commands/permalerte.js
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'permalerte',
  description: 'Alerte en cas d\'obtention de la permission admin',
  usage: '<ID du salon>',
  
  execute(message, args) {
    
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const noAdminPermissionEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Erreur de Permission')
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');

      return message.reply({ embeds: [noAdminPermissionEmbed] });
    }

   
    const channelId = args[0];
    if (!channelId) {
      const noChannelIdEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur d\'Argument')
        .setDescription('Veuillez fournir l\'ID du salon où envoyer l\'alerte.');

      return message.reply({ embeds: [noChannelIdEmbed] });
    }

    
    const alertChannel = message.guild.channels.cache.get(channelId);

    if (!alertChannel) {
      const channelNotFoundEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur de Salon')
        .setDescription('Impossible de trouver le salon avec l\'ID spécifié.');

      return message.reply({ embeds: [channelNotFoundEmbed] });
    }

   
    message.client.on('guildMemberUpdate', (oldMember, newMember) => {
      const oldHasAdmin = oldMember.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
      const newHasAdmin = newMember.permissions.has(Permissions.FLAGS.ADMINISTRATOR);

      if (!oldHasAdmin && newHasAdmin) {
        const adminAlertEmbed = new MessageEmbed()
          .setColor(2829617)
          .setTitle('Alerte de Permission')
          .setDescription(`L'utilisateur ${newMember.user} (${newMember.user.tag}) a obtenu la permission d'administrateur!`)
          .setTimestamp();

        alertChannel.send({ content: '@everyone', embeds: [adminAlertEmbed] });
      }
    });

    message.reply(`La commande d'alerte de permission a été configurée pour le salon avec l'ID ${channelId}.`);
  },
};

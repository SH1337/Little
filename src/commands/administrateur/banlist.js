// commands/banlist.js
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'banlist',
  description: 'Affiche la liste des utilisateurs bannis',
  permissions: [Permissions.FLAGS.BAN_MEMBERS],

  execute(message) {
    
    if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      const noBotPermissionEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur de Permission')
        .setDescription('Je n\'ai pas la permission de voir la liste des utilisateurs bannis.');

      return message.reply({ embeds: [noBotPermissionEmbed] });
    }

    
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      const noUserPermissionEmbed = new MessageEmbed()
        .setColor(2829617)
        .setTitle('Erreur de Permission')
        .setDescription('Vous n\'avez pas la permission de voir la liste des utilisateurs bannis.');

      return message.reply({ embeds: [noUserPermissionEmbed] });
    }


    message.guild.bans.fetch()
      .then(bans => {
        const banListEmbed = new MessageEmbed()
          .setColor(2829617)
          .setTitle('Liste des Utilisateurs Bannis');

        if (bans.size > 0) {
          bans.forEach(ban => {
            const banReason = ban.reason || 'Aucune raison spécifiée';
            banListEmbed.setDescription(`${banListEmbed.description || ''}\n **${ban.user.tag}** (*${ban.user.id}*) - Raison: \`${banReason}\``);
          });
        } else {
          banListEmbed.setDescription('Aucun utilisateur n\'est actuellement banni.');
        }

        message.reply({ embeds: [banListEmbed] });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la liste des utilisateurs bannis :', error);

        const banListErrorEmbed = new MessageEmbed()
          .setColor(2829617)
          .setTitle('Erreur de Récupération')
          .setDescription('Une erreur s\'est produite lors de la récupération de la liste des utilisateurs bannis.');

        message.reply({ embeds: [banListErrorEmbed] });
      });
  },
};

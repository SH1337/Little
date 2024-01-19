// commands/mutelist.js
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mutelist',
  description: 'Affiche la liste des membres mute du serveur',

  execute(message) {
    
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply('Vous n\'avez pas la permission de gérer les rôles.');
    }

    
    const mutedMembers = message.guild.members.cache.filter((member) => member.roles.cache.some((role) => role.name === 'Muted'));

    
    const embed = new MessageEmbed()
      .setColor(2829617)
      .setTitle('Liste des Membres Mute')
      .setDescription(`Il y a actuellement ${mutedMembers.size} membres mute sur le serveur.`);

   
    mutedMembers.forEach((member) => {
      embed.addField('Membre', `${member.user.tag} (${member.id})`, true);
    });

    message.channel.send({ embeds: [embed] });
  },
};

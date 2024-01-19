const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'renew',
  description: 'Supprime et recrée le salon avec des autorisations similaires à la catégorie parente',

  async execute(message, args) {
    try {
      
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
        return message.reply('Vous n\'avez pas la permission de gérer les salons.');
      }

      
      const channel = message.channel;

      
      let overwrites = [];
      if (channel.parent) {
        
        overwrites = channel.parent.permissionOverwrites.cache.toJSON();
      } else if (channel.permissionOverwrites) {
        
        overwrites = channel.permissionOverwrites.cache.toJSON();
      }

      
      await channel.delete();

      
      const renewedChannel = await channel.guild.channels.create(channel.name, {
        type: channel.type,
        topic: channel.topic,
        permissionOverwrites: overwrites,
      });

      const successEmbed = new MessageEmbed()
        .setColor(2829617)
        .setDescription(`Le salon ${channel.name} a été recréé avec succes.`);

      
      renewedChannel.send({ embeds: [successEmbed] });
    } catch (error) {
      console.error('Erreur lors du renouvellement du salon :', error);
      const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setDescription('Une erreur s\'est produite lors du renouvellement du salon.');

      
      message.channel.send({ embeds: [errorEmbed] });
    }
  },
};

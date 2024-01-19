// events/guildMemberUpdate.js
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  execute(oldMember, newMember) {
   
    if (!oldMember.premiumSince && newMember.premiumSince) {
      
      const boostChannelId = db.get(`boostChannel_${newMember.guild.id}`);

      if (boostChannelId) {
      
        const boostChannel = newMember.guild.channels.cache.get(boostChannelId);

        if (boostChannel) {
         
          const boostEmbed = new MessageEmbed()
            .setColor('#FFD700') 
            .setTitle('🚀 Nouveau boost !')
            .setDescription(`${newMember.user.tag} a commencé à booster le serveur. Merci pour votre soutien ! 🎉`)
            .setTimestamp();

          
          boostChannel.send({ embeds: [boostEmbed] });
        } else {
          console.error(`Le salon de boost avec l'ID "${boostChannelId}" n'existe pas.`);
        }
      } else {
        console.error('L\'ID du salon de boost n\'a pas été défini dans la base de données.');
      }
    }
  },
};

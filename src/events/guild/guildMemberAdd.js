// events/guildMemberAdd.js
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  once: false, 
  execute(member) {
   
    const welcomeChannel = member.guild.channels.cache.get('1188463848353697860');
    
    if (welcomeChannel) {
      const welcomeEmbed = new MessageEmbed()
        .setColor('#000001')
        .setTitle(`Bienvenue sur le serveur, ${member.user.tag}!`)
        .setDescription(`Nous sommes ravis de t'avoir parmi nous. N'hésite pas à lire les règles et à participer aux discussions.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter('Welcome');

      welcomeChannel.send({ embeds: [welcomeEmbed] });
    }
  },
};

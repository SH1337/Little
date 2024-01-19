const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  once: false,
  channelId: null,
  execute(member) {
    const leaveChannelId = this.channelId;

    const leaveChannel = member.guild.channels.cache.get(leaveChannelId);

    if (leaveChannel) {
      const leaveEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Au Revoir, ${member.user.tag}!`)
        .setDescription(`Nous sommes tristes de te voir partir. En espérant te revoir bientôt.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(`${message.client.user.username}`);

      leaveChannel.send({ embeds: [leaveEmbed] });
    }
  },
};

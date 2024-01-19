// commands/help.js


module.exports = {
  name: 'help',
  description: 'Afficher la liste des commandes disponibles',

  execute(message, args, commands) {
    const helpEmbed = {
      color: 2829617,
      author: {
        name: `📑 Commandes du bot`,
        icon_url: message.client.user.displayAvatarURL(),
      },
      fields: [
        {
          name: "🛠・Administrateur",
          value: "`Ban`,  `kick`,  `banlist`,  `lock`,  `unlock`,  `lockall`,  `unlockall`,  `mute`,  `unmute`,  `mutelist`,  `renew`,  `addemoji`,  `delemoji`",
          inline: false
        },
        {
          name: "👀・User",
          value: "`help`, `botinfo`,`commandeinfo`, `support`, `botinvite`",
          inline: false
        },
        {
          name: "👑・Owner",
          value: "`prefix`, `server`, `setpic`, `setname`, `leaveguild`, `activity`, `setstatus`, `owner add/remove`, `ownerslist`,",
          inline: false
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `${message.client.user.username}`,
      },
      thumbnail: {
        url: message.client.user.displayAvatarURL(),
      },
    };

    message.channel.send({ embeds: [helpEmbed] });
  },
};

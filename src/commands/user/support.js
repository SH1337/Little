const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'support',
  description: 'Affiche le lien du serveur de support',
  execute(message) {
    
    const joinButton = new MessageButton()
      .setStyle('LINK')
      .setLabel('Rejoindre le serveur de support')
      .setURL('https://discord.gg/hanamibot');

   
    const row = new MessageActionRow().addComponents(joinButton);

    
    const embed = {
      color: 2829617,
      title: 'Serveur de Support',
      description: 'Cliquez sur le bouton ci-dessous pour rejoindre notre serveur de support.',
      timestamp: new Date(),
      footer: {
        text: `${message.client.user.username}`,
        icon_url: message.client.user.displayAvatarURL(),
      },
    };

  
    message.channel.send({ embeds: [embed], components: [row] });
  },
};

// botinvite.js
  const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
  const config = require('../../../config.js'); 
  module.exports = {
    name: 'botinvite',
    description: 'Obtenir un lien d\'invitation pour ajouter le bot à un serveur',
    execute(message) {
     
      const clientId = config.clientId;
  
      const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`;
  
      
      const inviteButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('Ajouter le bot à votre serveur')
        .setURL(inviteLink);
  
      
      const embed = new MessageEmbed()
        .setColor(2829617) 
        .setTitle('Invitez le bot sur votre serveur')
        .setDescription('Cliquez sur le bouton ci-dessous pour ajouter le bot à votre serveur Discord. Le bot aura la permission ADMINISTRATOR.')
        .setFooter(`${message.client.user.username}`)
        .setTimestamp();
  
      
      const row = new MessageActionRow().addComponents(inviteButton);
      message.channel.send({ embeds: [embed], components: [row] });
    },
  };
  
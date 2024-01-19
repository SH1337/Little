const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config');

module.exports = {
  name: 'commandeinfo',
  description: 'Affiche des informations sur une commande spécifique.',
  usage: `${prefix}commandeinfo <nom_de_la_commande>`,
  execute: (message, args) => {
   
    const commandName = args[0];
    if (!commandName) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Veuillez fournir le nom d\'une commande.');
      return message.reply({ embeds: [embed] });
    }

   
    const command = message.client.commands.get(commandName);

    
    if (!command) {
      const embed = new MessageEmbed()
        .setColor(2829617)
        .setDescription('Cette commande n\'existe pas.');
      return message.reply({ embeds: [embed] });
    }

  
    const embed = new MessageEmbed()
      .setColor(2829617)
      .setTitle('Informations sur la commande')
      .setDescription(`**Nom:** ${command.name}\n**Description:** ${command.description}\n**Utilisation:** ${command.usage}`);

    message.channel.send({ embeds: [embed] });
  },
};

const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: 'verif',
  description: 'Vérifier les utilisateurs avec un bouton.',
  usage: '<role>',
  async execute(message, args) {
    
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    
    const mentionedRole = message.mentions.roles.first();

    if (!mentionedRole) {
      return message.reply('Veuillez mentionner un rôle pour la vérification.');
    }

    
    const embed = new MessageEmbed()
      .setColor(2829617)
      .setTitle('Vérification')
      .setDescription('Cliquez sur le bouton ci-dessous pour vous vérifier.')
      .setThumbnail(message.client.user.displayAvatarURL());

    // Créer un bouton de vérification
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('verification_button')
          .setLabel('✅')
          .setStyle('PRIMARY')
      );

    
    const messageWithButton = await message.channel.send({ embeds: [embed], components: [row] });

    
    const filter = (interaction) => {
      return interaction.customId === 'verification_button' && interaction.user.id === message.author.id;
    };

    const collector = messageWithButton.createMessageComponentCollector({ filter, time: 60000 });

    
    collector.on('collect', async (interaction) => {
      
      const member = message.guild.members.cache.get(interaction.user.id);

      if (member) {
        await member.roles.add(mentionedRole);
        interaction.reply('Vous avez été vérifié avec succès!');
      } else {
        interaction.reply('Une erreur s\'est produite lors de la vérification.');
      }
    });

    
    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        
        row.components[0].setDisabled(true);
        messageWithButton.edit({ components: [row] });
      }
    });
  },
};

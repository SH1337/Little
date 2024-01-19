const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute un utilisateur')
    .addUserOption(option => option.setName('utilisateur').setDescription('L\'utilisateur à rendre muet')),

  async execute(interaction) {
   
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES) || !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply('Vous n\'avez pas la permission de gérer les rôles ou les salons.');
    }

    
    const targetUser = interaction.options.getUser('utilisateur');

   
    if (!targetUser) {
      return interaction.reply('Veuillez mentionner l\'utilisateur que vous souhaitez mute.');
    }

    
    let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      try {
        muteRole = await interaction.guild.roles.create({
          name: 'Muted',
          permissions: [],
        });
      } catch (error) {
        console.error('Erreur lors de la création du rôle Muted :', error);
        return interaction.reply('Une erreur s\'est produite lors de la création du rôle Muted.');
      }
    }

    
    const targetMember = await interaction.guild.members.fetch(targetUser.id)
      .catch(error => {
        console.error('Erreur lors de la récupération du membre :', error);
        return interaction.reply('Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur.');
      });

    
    if (!targetMember) {
      return interaction.reply('Cet utilisateur n\'est pas membre du serveur.');
    }

    
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return interaction.reply('Je n\'ai pas la permission de gérer les rôles.');
    }

   
    targetMember.roles.add(muteRole)
      .then(() => {
        interaction.reply(`L'utilisateur ${targetUser.tag} a été mute.`);

        
        interaction.guild.channels.cache.forEach(channel => {
          if (channel.type === 'GUILD_TEXT') {
            channel.permissionOverwrites.edit(muteRole, { SEND_MESSAGES: false });
          }
        });
      })
      .catch(error => {
        console.error('Erreur lors de la mise en sourdine de l\'utilisateur :', error);
        interaction.reply('Une erreur s\'est produite lors de la mise en sourdine de l\'utilisateur.');
      });
  },
};

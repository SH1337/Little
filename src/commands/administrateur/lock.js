// commands/lock.js

module.exports = {
  name: 'lock',
  description: 'Verrouille le salon où la commande est exécutée.',
  async execute(message) {
    
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Vous n\'avez pas la permission de verrouiller le salon.');
    }

    const channel = message.channel;

    
    if (channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
      
      channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });

      message.reply('Le salon a été verrouillé.');
    } else {
      
      message.reply('Le salon est déjà verrouillé.');
    }
  },
};

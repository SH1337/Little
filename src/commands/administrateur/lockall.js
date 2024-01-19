// commands/lockall.js
module.exports = {
    name: 'lockall',
    description: 'Verrouille tous les salons du serveur.',
    execute(message) {
      
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply("Vous n'avez pas la permission de gérer les salons.");
      }
  
      const guild = message.guild;
  
      
      guild.channels.cache.forEach((channel) => {
        
        if (channel.type === 'GUILD_TEXT') {
          
          channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
          });
        }
      });
  
      message.reply('Tous les salons ont été verrouillés.');
    },
  };
  
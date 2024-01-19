// commands/addemoji.js
module.exports = {
    name: 'addemoji',
    description: 'Ajouter un emoji au serveur',
    async execute(message, args) {
     
      const emojiArgument = args[0];
      if (!emojiArgument) {
        return message.reply('Veuillez fournir l\'emoji à ajouter.');
      }
  
      
      const customEmojiRegex = /<a?:(\w+):(\d+)>/;
      const match = emojiArgument.match(customEmojiRegex);
  
      if (!match) {
        return message.reply('Veuillez fournir un emoji valide.');
      }
  
      
      const [emojiName, emojiId] = match.slice(1);
  
      try {
        
        const extension = emojiArgument.startsWith('<a:') ? 'gif' : 'png';
  
      
        const emojiToAdd = await message.guild.emojis.create(
          `https://cdn.discordapp.com/emojis/${emojiId}.${extension}`, 
          emojiName
        );
  
        message.reply(`Emoji ajouté avec succès: ${emojiToAdd}`);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'emoji:', error);
        message.reply('Une erreur s\'est produite lors de l\'ajout de l\'emoji.');
      }
    },
  };
  
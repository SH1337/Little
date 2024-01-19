// commands/removeemoji.js
module.exports = {
    name: 'delemoji',
    description: 'Supprimer un emoji du serveur',
   async execute(message, args) {
  
     
      const emojiArgument = args[0];
      if (!emojiArgument) {
        return message.reply('Veuillez fournir l\'emoji à supprimer.');
      }
  
      
      const customEmojiRegex = /<a?:\w+:\d+>/;
      if (!customEmojiRegex.test(emojiArgument)) {
        return message.reply('Veuillez fournir un emoji valide.');
      }
  
      const emojiId = emojiArgument.match(/\d+/)[0];
  
     
      const emojiToRemove = message.guild.emojis.cache.get(emojiId);
  
     
      if (!emojiToRemove) {
        return message.reply('L\'emoji spécifié n\'existe pas dans ce serveur.');
      }
  
      
      emojiToRemove.delete()
        .then(() => {
          message.reply(`Emoji supprimé avec succès.`);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de l\'emoji:', error);
          message.reply('Une erreur s\'est produite lors de la suppression de l\'emoji.');
        });
    },
  };
  
// setpic.js
const { MessageEmbed } = require('discord.js');
const { buyeurKey } = require('../../../config');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: 'setpic',
  description: 'Changer l\'avatar du bot',
  usage: '<lien de l\'avatar>',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de changer la photo de profil du bot.');
    }

   
    if (args.length !== 1) {
      return message.reply('Veuillez fournir le lien de l\'avatar.');
    }

   
    const avatarURL = args[0];

    try {
     
      await message.client.user.setAvatar(avatarURL);

     
      const embed = new MessageEmbed()
        .setColor(2829617) // 
        // .setTitle('Avatar mis à jour')
        .setDescription('L\'avatar du bot a été mis à jour.')
        .setImage(avatarURL)
        .setFooter(`${message.client.user.username}`)
        .setTimestamp();

      
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply('Une erreur s\'est produite lors de la mise à jour de l\'avatar du bot.');
    }
  },
};

async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}

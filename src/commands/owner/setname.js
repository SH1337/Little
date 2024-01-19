// setname.js
const { MessageEmbed } = require('discord.js');
const { buyeurKey } = require('../../../config');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: 'setname',
  description: 'Changer le nom du bot',
  usage: '<nouveau nom>',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de changer le nom du bot.');
    }

    
    if (args.length !== 1) {
      return message.reply('Veuillez fournir le nouveau nom.');
    }

   
    const newName = args[0];

    try {
     
      const lastChangeTimestamp = await db.get('lastNameChangeTimestamp') || 0;
const cooldown = 60 * 60 * 1000; 

if (Date.now() - lastChangeTimestamp < cooldown) {
  const remainingTime = cooldown - (Date.now() - lastChangeTimestamp);
  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.ceil((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

  return message.reply(`Veuillez attendre \`${hours}\` heures et \`${minutes}\` minutes avant de changer à nouveau le nom.`);
}

    
      await message.client.user.setUsername(newName);

      
      await db.set('lastNameChangeTimestamp', Date.now());

      const embed = new MessageEmbed()
        .setColor(2829617)
        // .setTitle('Nom mis à jour')
        .setDescription(`Le nom du bot a été mis à jour : \`${newName}\``)
        .setFooter(`${message.client.user.username}`)
        .setTimestamp();

      
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply('Une erreur s\'est produite lors de la mise à jour du nom du bot.');
    }
  },
};

async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}

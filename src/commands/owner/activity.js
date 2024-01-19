// setstatus.js
const { MessageEmbed } = require('discord.js');
const { buyeurKey } = require('../../../config'); 
const { QuickDB } = require("quick.db");
const db = new QuickDB();


const twitchLink = 'https://www.twitch.tv/moncanaltwitch'; 

module.exports = {
  name: 'activity',
  description: 'Changer l\'activite du bot',
  usage: '<type> <text>',
  async execute(message, args) {
    
    if (!(await isBuyerAuthorized(message.author.id))) {
      return message.reply('Vous n\'avez pas la permission de changer le statut du bot.');
    }

    
    if (args.length < 2) {
      return message.reply('Veuillez fournir le type de statut (playing, watching, listening, streaming) et le texte.');
    }

    
    const type = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

   
    if (!['playing', 'watching', 'listening', 'streaming'].includes(type)) {
      return message.reply('Type de statut invalide. Utilisez l\'un des suivants : playing, watching, listening, streaming.');
    }

    
    const activityOptions = {
      playing: 'PLAYING',
      watching: 'WATCHING',
      listening: 'LISTENING',
      streaming: 'STREAMING',
    };

    const activityType = activityOptions[type];

   
    message.client.user.setActivity(text, { type: activityType, url: type === 'streaming' ? twitchLink : null });

    
    const embed = new MessageEmbed()
      .setColor(2829617)
      // .setTitle('Statut mis à jour')
      .setDescription(`Le statut du bot a été mis à jour : \`${type.toUpperCase()} ${text}\``)
      .setFooter(`${message.client.user.username}`)
      .setTimestamp();

    
    message.channel.send({ embeds: [embed] });
  },
};


async function isBuyerAuthorized(userId) {
  return userId === buyeurKey;
}

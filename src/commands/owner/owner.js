// commands/owner.js
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require('../../../config.js');

module.exports = {
  name: 'owner',
  description: 'Ajouter ou retirer un propriétaire du bot',
  usage: '<add/remove> <@utilisateur>',
  async execute(message, args) {
   
    if (message.author.id !== config.buyeurKey) {
      return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

   
    const option = args[0];
    const user = message.mentions.users.first();

    if (!option || !user) {
      return message.reply('Veuillez fournir l\'option (add/remove) et mentionner l\'utilisateur.');
    }

    
    if (option === 'add') {
      
      if (await isBotOwner(user.id)) {
        return message.reply('Cet utilisateur est déjà un propriétaire.');
      }

      
      await addBotOwner(user.id);

      
      message.reply(`L'utilisateur ${user.tag} a été ajouté en tant que propriétaire.`);
    } else if (option === 'remove') {
     
      if (!(await isBotOwner(user.id))) {
        return message.reply('Cet utilisateur n\'est pas un propriétaire.');
      }

     
      await removeBotOwner(user.id);

      
      message.reply(`L'utilisateur ${user.tag} a été retiré en tant que propriétaire.`);
    } else {
      return message.reply('Option invalide. Utilisez "add" ou "remove".');
    }
  },
};

async function isBotOwner(userId) {
  const owners = await db.get(config.ownersKey);
  return owners && owners.includes(userId);
}

async function addBotOwner(userId) {
  const owners = (await db.get(config.ownersKey)) || [];
  owners.push(userId);
  await db.set(config.ownersKey, owners);
}

async function removeBotOwner(userId) {
  const owners = (await db.get(config.ownersKey)) || [];
  const updatedOwners = owners.filter(ownerId => ownerId !== userId);
  await db.set(config.ownersKey, updatedOwners);
}

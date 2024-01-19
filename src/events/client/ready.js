module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Connecté en tant que ${client.user.tag}!`);

    const initialStatus = {
      type: 'STREAMING',
      text: 'My Prefix is ?',
      url: 'https://www.twitch.tv/donshiris'
    };

    client.user.setActivity(initialStatus.text, { type: initialStatus.type });
  },
};

  
  //  url: 'https://www.twitch.tv/donshiris'

  //client.user.setActivity({ name: 'Haruki Test', type: 'STREAMING', url: 'https://www.twitch.tv/donshiris' });
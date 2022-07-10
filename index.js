const fs = require('fs');
const { Client } = require('discord.js');
const prefix = 'DEFINE_THIS';
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES'
  ],
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix)) return;

  const commandName = message.content.substring(prefix.length).split(' ')[0];
  const args = message.content.split(' ').slice(1);

  const commandsList = fs.readdirSync('./commands').map(name => name.replace('.js', ''));
  if (!commandsList.includes(commandName)) {
    message.reply('I do not have that command!');
  }
  else {
    try {
      (require(`./commands/${commandName}`)).run(client, message, args);
    }
    catch (err) {
      console.log(err.stack);
      message.channel.send('Sorry, an error has occured');
    }

  }
})

client.login('...')
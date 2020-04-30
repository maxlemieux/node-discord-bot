if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Discord = require('discord.io');
const logger = require('winston');

/* Configure logger */
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

const client = new Discord.Client({
  token: process.env.DISCORD_AUTH,
  autorun: true
});

client.on('ready', evt => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(`${client.username} - (${client.id})`);
  // console.log(client)
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome-mat');
  channel.send(`Welcome ${member} to the server!`);
});

client.on('message', (user, userID, channelID, message, evt) => {
  // console.log(user);
  if (user !== 'node-discord-client') {
    if (message.toLowerCase().includes('orcs')) {
      const nickname = client.servers[client.channels[channelID].guild_id].members[userID].nick;
      // console.log(message);
      client.sendMessage({
        to: channelID,
        message: `Don't you know that orcs are smelly, ${nickname}?!`
      });
    }
    if (message.toLowerCase().includes('tauren')) {
      const nickname = client.servers[client.channels[channelID].guild_id].members[userID].nick;
      client.sendMessage({
        to: channelID,
        message: `TaUr3n? LOL HERBS NATURE 420 BLAZE IT DUDE!!!`
      });
    }
    if (message.toLowerCase().includes('forsaken')) {
      const nickname = client.servers[client.channels[channelID].guild_id].members[userID].nick;
      client.sendMessage({
        to: channelID,
        message: `Bone people aren't real people, ${nickname}`
      });
    }
    // Listen for messages that start with !
    if (message.substring(0, 1) === '!') {
      let args = message.substring(1).split(' ');
      const cmd = args[0];
  
      args = args.splice(1);
      switch(cmd) {
        case 'hi':
          logger.info('got a command');
          /* Get the nickname of the member who sent the command message */
          const nickname = client.servers[client.channels[channelID].guild_id].members[userID].nick;
  
          /* Assemble the rest of the words in the command message */
          const messagePhrase = args.join(' ');
  
          /* Respond to channel with a greeting */
          client.sendMessage({
            to: channelID,
            message: `Hello ${nickname}, let's talk about ${messagePhrase}`
          });
          break;
        default:
          break;
      };
    };  
  }
});
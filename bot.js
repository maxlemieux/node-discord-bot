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

const bot = new Discord.Client({
  token: process.env.DISCORD_AUTH,
  autorun: true
});

bot.on('ready', evt => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(`${bot.username} - (${bot.id})`);
});

bot.on('message', (user, userID, channelID, message, evt) => {
  // Listen for messages that start with !
  if (message.substring(0, 1) === '!') {
    let args = message.substring(1).split(' ');
    const cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      case 'hi':
        /* Get the nickname of the member who sent the command message */
        const nickname = bot.servers[bot.channels[channelID].guild_id].members[userID].nick;

        /* Assemble the rest of the words in the command message */
        const messagePhrase = args.join(' ');

        /* Respond to channel with a greeting */
        bot.sendMessage({
          to: channelID,
          message: `Hello ${nickname}, let's talk about ${messagePhrase}`
        });
        break;
      default:
        break;
    };
  };
});
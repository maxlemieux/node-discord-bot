# node-discord-bot

Discord bot built in Node.js. Use this as a platform to quickly begin to build functionality into a Discord bot.

## Setup

Install the codebase:

`git clone https://github.com/maxlemieux/node-discord-bot.git`

And the dependencies:

`npm i`

### Discord
Go to https://discordapp.com/developers/applications and click "New Application". Give your bot a name in the pop-up window that appears.

The next screen has information about the new application. On the left side menu, click "Settings > Bot" and then "Add Bot" to create a Discord user for the bot.

On the center right of the Bot screen is "Token". Click "Click to Reveal" and copy this "Token" string. You will place this string in the environment variable (and/or Heroku config variable) named `DISCORD_AUTH`.

Now, scroll down to Permissions. You will see a ton of checkboxes. The only one we need to check is "Send Messages", for now.

Back on the left side of Settings, click "OAuth2" and scroll down to the Scopes section. Check "Bot", then grab the URL from the bottom of the Scopes section. You'll use it to add your bot to a Discord server.

### Environment
Create a new file named `.env` in the root directory of your bot. In this file, add this line to set `DISCORD_AUTH`, where myTokenHere is the Token string from Discord's bot settings page:

`DISCORD_AUTH=myTokenHere`

The reason we put this in .env is to prevent committing the token to version control (Github, etc). If you commit the token to a public repository, Discord will revoke it for security reasons.

### Heroku

This assumes you already have a Heroku account, heroku-cli installed and logged in. Basic Heroku setup is beyond the scope of this readme.

Start a new Heroku app by running this command in the root directory of the bot:

`heroku create`

Go to the Heroku website, find the new app you just created and add a config variable called `DISCORD_AUTH` with the value of the bot's Token, as above in "Environment".

Now, push the code up to the Heroku app:

`git push heroku`

If everything worked, your bot should now be online.
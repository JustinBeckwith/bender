import { Client, Collection, Intents } from 'discord.js';
import fs from 'fs';
import nconf from 'nconf';

nconf.env().file({ file: 'config.json' });
const token = nconf.get('token');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();
const commandFiles = (await fs.promises.readdir('./src/commands')).filter((file) =>
  file.endsWith('.js')
);
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = (await fs.promises.readdir('./src/events')).filter((file) =>
  file.endsWith('.js')
);
for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);

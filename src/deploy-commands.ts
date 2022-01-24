import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import nconf from 'nconf';
import fs from 'fs';

nconf.env().file({ file: 'config.json' });

const clientId = nconf.get('clientId');
const token = nconf.get('token');
const rest = new REST({ version: '9' }).setToken(token);
const commands = [];

const commandFiles = (await fs.promises.readdir('./commands')).filter((file) =>
  file.endsWith('.js')
);
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

await rest.put(Routes.applicationCommands(clientId), {
  body: commands,
});
console.log('Successfully registered application commands.');

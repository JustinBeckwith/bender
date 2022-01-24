import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with server info!');

export async function execute(interaction: Message) {
  await interaction.reply(
    `Server name: ${interaction.guild!.name}\nTotal members: ${interaction.guild!.memberCount}`
  );
}

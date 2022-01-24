import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction: Message) {
  await interaction.reply('Pong!');
}

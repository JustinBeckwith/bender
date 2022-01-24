import { SlashCommandBuilder } from '@discordjs/builders';
import { Message, MessageInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Replies with user info!');

export async function execute(interaction: MessageInteraction & Message) {
  await interaction.reply(
    `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  );
}

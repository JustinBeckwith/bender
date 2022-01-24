import { Interaction } from "discord.js";

export const name = 'interactionCreate';
export async function execute(interaction: Interaction) {
  console.log(
    `${interaction.user.tag} in #${(interaction.channel as any).name} triggered an interaction.`
  );
  if (!interaction.isCommand()) {
    return;
  }

  const command = (interaction.client as any).commands.get(interaction.commandName);
  if (!command) {
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: '😱 There was an error while executing this command!',
      ephemeral: true,
    });
  }
}

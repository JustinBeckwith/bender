import { MessageInteraction } from "discord.js";

export const name = 'messageCreate';
export async function execute(interaction: MessageInteraction) {
  console.log('hello from messageCreate!');
  console.log(interaction);
  // if (!interaction.isCommand()) {
  //   return;
  // }

  // const command = interaction.client.commands.get(interaction.commandName);
  // if (!command) {
  //   return;
  // }

  // try {
  //   await command.execute(interaction);
  // } catch (error) {
  //   console.error(error);
  //   await interaction.reply({
  //     content: '😱 There was an error while executing this command!',
  //     ephemeral: true,
  //   });
  // }
}

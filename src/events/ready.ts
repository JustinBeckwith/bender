import { MessageInteraction } from "discord.js";

export const name = 'ready';
export const once = true;
export async function execute(client: MessageInteraction) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
}

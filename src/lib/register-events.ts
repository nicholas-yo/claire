import { Client } from "discord.js";
import { getEvents } from "./get-events";

export const registerEvents = async (client: Client) => {
  const events = await getEvents();

  for (const event of events) client.on(event.name, event.listener);
};

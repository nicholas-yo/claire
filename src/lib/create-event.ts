import type { ClientEvents } from "discord.js";

export type Listener<Event extends keyof ClientEvents> = (
  ...args: ClientEvents[Event]
) => void;

export type Event<ClientEvent extends keyof ClientEvents = keyof ClientEvents> =
  {
    name: ClientEvent;
    listener: Listener<ClientEvent>;
  };

export const createEvent = <ClientEvent extends keyof ClientEvents>(
  name: ClientEvent,
  listener: Listener<ClientEvent>
): Event<ClientEvent> => ({
  listener,
  name
});

/**
 * @description Creates a new event object.
 * @template {keyof import("discord.js").ClientEvents} EventName
 * @param {EventName} name - The name of the event.
 * @param {(...args: import("discord.js").ClientEvents[EventName]) => void} listener - The listener function for the event.
 * @returns {{ name: keyof import("discord.js").ClientEvents, listener: (...args: import("discord.js").ClientEvents[EventName]) => void}} The event object with the name and listener.
 */
export const createEvent = (name, listener) => ({
  listener,
  name
});

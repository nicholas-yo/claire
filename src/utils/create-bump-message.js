/**
 * @description Creates a personalized message based on a user's bump count.
 * @param {string} userId - The Discord user's ID.
 * @param {number | null} bumpCount - The user's bump count, which can be null if no bumps have been given.
 * @param {boolean} member - A boolean value indicating whether the user is a member (true) or not (false).
 * @returns {string} A Markdown-formatted string with the personalized message.
 */
export const createBumpMessage = (userId, bumpCount, member) => {
  if (!bumpCount) {
    return member
      ? /* md */ `Oh não, <@${userId}> ainda não deu nenhum bump! 💔`
      : /* md */ `Oh não, você ainda não deu nenhum bump! Mas não se preocupe, ainda há tempo para começar! 🔥💖`;
  }

  return member
    ? /* md */ `<@${userId}> tem **${bumpCount}** bumps! Uau, isso é fantástico! Continue com o bom trabalho! 💖`
    : /* md */ `Você tem **${bumpCount}** bumps! Isso é incrível! Continue assim! 💖`;
};

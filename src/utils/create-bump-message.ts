export const createBumpMessage = (
  userId: string,
  bumpCount: number | null,
  member: boolean
): string => {
  if (!bumpCount) {
    return member
      ? /* md */ `Oh não, <@${userId}> ainda não deu nenhum bump! 💔`
      : /* md */ `Oh não, você ainda não deu nenhum bump! Mas não se preocupe, ainda há tempo para começar! 🔥💖`;
  }

  return member
    ? /* md */ `<@${userId}> tem **${bumpCount}** bumps! Uau, isso é fantástico! Continue com o bom trabalho! 💖`
    : /* md */ `Você tem **${bumpCount}** bumps! Isso é incrível! Continue assim! 💖`;
};

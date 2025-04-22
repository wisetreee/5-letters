export const makeRemainingDateString = (time: string) => {
  const [days, hours, minutes] = time.split(":");
  return `${days}дн ${hours}ч ${minutes}м`;
};

export const addressShortner = (address, shorter) => {
  if (shorter)
    return `${address.slice(0, 5)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  return `${address.slice(0, 12)}.....${address.slice(
    address.length - 10,
    address.length
  )}`;
};

export const formatDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  const dateArray = date.toString().split(" ");
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}. ${dateArray[4]}`;
};

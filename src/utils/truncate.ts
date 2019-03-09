export const truncate = (str: string, amt: number) => {
  return str.length > amt ? str.slice(0, amt).concat('...') : str;
};

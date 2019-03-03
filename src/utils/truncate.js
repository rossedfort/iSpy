export const truncate = (str) => str.length > 50 ? str.slice(0, 50).concat('...') : str;

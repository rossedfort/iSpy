export const truncate = (str, amt) => str.length > amt ? str.slice(0, amt).concat('...') : str;

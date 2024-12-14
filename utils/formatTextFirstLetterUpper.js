export const formatText = (text) =>
  text.toLowerCase().replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());

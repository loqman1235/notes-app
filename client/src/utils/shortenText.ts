const shortenText = (text: string, length: number = 240): string => {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }

  return text;
};

export default shortenText;

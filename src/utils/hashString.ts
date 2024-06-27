const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash += (str.charCodeAt(i) * 31) ** (str.length - i);
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }
  return hash;
};

export default hashString;

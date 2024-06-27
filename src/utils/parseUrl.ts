import regex from '@constants/regex';

/**
 * A utility function to parse HTML string that contains URL
 */

export default function parseUrl(str: string) {
  return str.replace(regex.urlWithOrWithoutProtocol, (match) => {
    let href = '';
    let prefix = '';
    if (match.includes('https') || match.includes('http')) {
      href = `${match}`;
    } else {
      href = `https://${match}`;
      prefix = 'https://';
    }
    return `<a href="${href}" target="_blank" style="color:#016DB2">${prefix}${match}</a>`;
  });
}

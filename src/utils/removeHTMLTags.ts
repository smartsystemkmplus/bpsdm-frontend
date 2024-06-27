export default function removeHTMLTags(htmlString: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(htmlString, 'text/html');

  const textContent = doc.body.textContent || '';
  return textContent.trim();
}

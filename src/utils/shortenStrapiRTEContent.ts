import { BlocksContent } from '@strapi/blocks-react-renderer';

export default function shortenStrapiRTEContent(
  content: BlocksContent
): BlocksContent {
  if (content.length > 2) {
    return [content[0], content[1]];
  }
  return content;
}

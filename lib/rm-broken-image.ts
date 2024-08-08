// utils/sanitizeHtml.ts
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Function to remove broken image links
export const removeBrokenImageLinks = (html: string): string => {
  const dom = new JSDOM(html);
  const DOMPurify = createDOMPurify(dom.window as unknown as Window);
  const { document } = dom.window;
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    img.onerror = () => img.remove(); // Remove image if it fails to load
  });

  return DOMPurify.sanitize(document.body.innerHTML); // Sanitize the updated HTML
};


export default removeBrokenImageLinks;
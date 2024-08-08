import fs from 'fs';
import path from 'path';

export async function getMarkdownContent(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return fileContents;
}

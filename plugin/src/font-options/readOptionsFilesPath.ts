import path from 'path';
import fs from 'fs';

export default function readFontOptionsFilesPath() {
  const fontFilesPaths: string[] = [];
  const readDirectoryRecursively = (directoryPath: string) => {
    try {
      const files = fs.readdirSync(directoryPath);
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          readDirectoryRecursively(filePath);
        } else {
          fontFilesPaths.push(filePath);
        }
      });
    } catch (err) {
      console.error('Error while reading file', err);
    }
  };
  const directoryPath = path.join(__dirname, '../fontsOptions');
  readDirectoryRecursively(directoryPath);

  return fontFilesPaths;
}

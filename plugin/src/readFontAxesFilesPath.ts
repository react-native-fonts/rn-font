import fs from 'fs';
import path from 'path';

export const readFontAxesFilesPath = () => {
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
      console.error('Błąd podczas odczytywania folderu:', err);
    }
  };
  const directoryPath = path.join(__dirname, '../font');
  readDirectoryRecursively(directoryPath);

  return fontFilesPaths;
};

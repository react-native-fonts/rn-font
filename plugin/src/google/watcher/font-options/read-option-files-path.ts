import path from 'path';
import fs from 'fs';
import { fontOptionsPath } from '../../utils/paths';

// get all the font options files path (from fontOptions folder)
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
      throw new Error('Error while reading file');
    }
  };

  readDirectoryRecursively(fontOptionsPath);

  return fontFilesPaths;
}

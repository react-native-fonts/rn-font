import path from 'path';

import fs from 'fs';

namespace fontOptions {
  export function watchDirChanges() {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    const filePaths = readFontOptionsFilesPath();

    filePaths.forEach((filePath) => {
      const componentPath = (
        process.cwd() + filePath.split('fontsOptions')[1]
      ).replace('.json', '');

      for (const ext of extensions) {
        console.log('checking', componentPath + ext);

        if (!fs.existsSync(componentPath + ext)) {
          if (ext === extensions[extensions.length - 1]) {
            console.log('File does not exist', componentPath);
            fs.unlinkSync(filePath);
          }
        } else break;
      }
    });
  }

  export function readFontOptionsFilesPath() {
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
    const directoryPath = path.join(__dirname, '../fontsOptions');
    readDirectoryRecursively(directoryPath);

    return fontFilesPaths;
  }

  export function createFontAxesFile(filePath: string, fontCache: any) {
    const folderPathWithoutFileName = filePath
      .split('/')
      .slice(0, -1)
      .join('/');

    const folderPath = path.join(
      __dirname,
      `../font${
        folderPathWithoutFileName ? `/${folderPathWithoutFileName}` : ''
      }`
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const jsonPath = path.join(__dirname, `../font/${filePath}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(fontCache, null, 2), {
      flag: 'w',
    });
  }
}

export default fontOptions;

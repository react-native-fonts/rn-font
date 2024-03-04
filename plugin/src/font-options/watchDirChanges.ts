import fs from 'fs';
import readFontOptionsFilesPath from './readOptionsFilesPath';

export default function watchDirChanges() {
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const filePaths = readFontOptionsFilesPath();

  filePaths?.forEach((filePath) => {
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

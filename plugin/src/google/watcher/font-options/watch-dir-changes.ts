import fs from 'fs';
import { correctReactExts } from '../../constants/react-exts';
import { readFontOptionsFilesPath } from './';

export default function watchDirChanges() {
  const filePaths = readFontOptionsFilesPath();

  filePaths?.forEach((filePath) => {
    const componentPath = (
      process.cwd() + filePath.replace('fontsOptions', '')
    ).replace('.json', '');

    for (const ext of correctReactExts) {
      if (!fs.existsSync(componentPath + ext)) {
        if (ext === correctReactExts[correctReactExts.length - 1]) {
          fs.unlinkSync(filePath);
        }
      } else break;
    }
  });
}

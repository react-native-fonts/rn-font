import fs from 'fs';
import readFontOptionsFilesPath from './readOptionsFilesPath';
import { correctReactExts } from '../utils/correct-react-exts';

export default function watchDirChanges() {
  const filePaths = readFontOptionsFilesPath();

  filePaths?.forEach((filePath) => {
    // const componentPath = (
    //   process.cwd() + filePath.split('fontsOptions')[1]
    // ).replace('.json', '');
    //dont use split - use replace instead
    console.log(filePath, 'filePath');
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

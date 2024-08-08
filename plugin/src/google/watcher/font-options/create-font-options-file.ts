import path from 'path';
import fs from 'fs';

import { fontOptionsPath } from '../../utils/paths';
import { watchDirChanges } from './';

export default function createFontOptionsFile(
  filePath: string,
  fontCache: any
) {
  watchDirChanges();

  const folderPathWithoutFileName = filePath.split('/').slice(0, -1).join('/');

  const folderPath = path.join(
    fontOptionsPath,
    folderPathWithoutFileName ? `/${folderPathWithoutFileName}` : ''
  );

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const jsonPath = path.join(fontOptionsPath, `${filePath}.json`);

  if (Object.keys(fontCache).length === 0 && fs.existsSync(jsonPath)) {
    return fs.unlinkSync(jsonPath);
  }

  if (filePath && Object.keys(fontCache).length > 0)
    fs.writeFileSync(jsonPath, JSON.stringify(fontCache, null, 2), {
      flag: 'w',
    });
}

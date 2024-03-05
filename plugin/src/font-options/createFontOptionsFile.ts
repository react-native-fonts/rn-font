import path from 'path';
import fs from 'fs';

import watchDirChanges from './watchDirChanges';

export default function createFontOptionsFile(
  filePath: string,
  fontCache: any
) {
  watchDirChanges();

  const folderPathWithoutFileName = filePath.split('/').slice(0, -1).join('/');

  const folderPath = path.join(
    __dirname,
    `../fontsOptions${
      folderPathWithoutFileName ? `/${folderPathWithoutFileName}` : ''
    }`
  );

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const jsonPath = path.join(__dirname, `../fontsOptions/${filePath}.json`);
  if (filePath && Boolean(fontCache))
    fs.writeFileSync(jsonPath, JSON.stringify(fontCache, null, 2), {
      flag: 'w',
    });
}

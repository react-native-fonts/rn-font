import path from 'path';
import fs from 'fs';

export const downloadFont = (
  fontPath: string,
  fontName: string | undefined
) => {
  console.log('downloadFont', fontPath, fontName);
  const newFontPath = path.join(
    process.cwd(),
    `android/app/src/main/res/font/${
      fontPath.split('/').reverse()[0]?.toLowerCase().replaceAll(' ', '_') || ''
    }`
  );

  if (fs.existsSync(newFontPath)) return;

  fs.copyFile(fontPath, newFontPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

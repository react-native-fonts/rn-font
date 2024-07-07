import fs from 'fs';
import path from 'path';
import { getFontName, type Font } from './';
import { getProjectPath, getRegisterFontText } from './android-xml-fonts';
import fonts from '../../../src/font/google/font-data.json';

export default function cleanupUnusedFonts(
  filePath: string,
  androidFilePath: string,
  fontDownloadUrls: Font[]
) {
  const fontFiles = fs
    .readdirSync(filePath)
    .filter((item) => item !== '.gitkeep');

  fontFiles.forEach((font) => {
    // eg. "albert_sans"
    const fontFixedName = font.replace(font.split('.').pop()!, '').slice(0, -1);
    const fontInUse = fontDownloadUrls.find(
      (item) => fontFixedName === getFontName(item)
    );
    const fontName = fontFixedName.split('_')[0];

    if (!fontName) return;

    if (!fontInUse && fontFixedName) {
      fs.unlinkSync(path.join(filePath, font));

      if (fs.existsSync(path.join(androidFilePath, font))) {
        fs.unlinkSync(path.join(androidFilePath, font));
      }

      if (fs.existsSync(path.join(androidFilePath, `${fontName}.xml`))) {
        fs.unlinkSync(path.join(androidFilePath, `${fontName}.xml`));

        //TODO: if rn version is < 0.73 then remove import from MainApplication.java
        const projectPath = getProjectPath('MainApplication.kt');
        if (!projectPath) return;

        fs.readFile(projectPath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          const registerFontName = Object.keys(fonts).find(
            (item) => item.toLowerCase().replaceAll(' ', '_') === fontName
          );

          if (!registerFontName) return;

          console.log(registerFontName);

          fs.writeFile(
            projectPath,
            data.replaceAll(getRegisterFontText(registerFontName), ''),
            'utf8',
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
        });
      }
    }
  });
}

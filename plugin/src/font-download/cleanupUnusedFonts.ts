import fs from 'fs';
import path from 'path';
import { getFontName, type Font } from './';
import { getProjectPath, getRegisterFontText } from './android-xml-fonts';

export default function cleanupUnusedFonts(
  filePath: string,
  androidFilePath: string,
  fontDownloadUrls: Font[],
  usedFontNames: string[]
) {
  const fontFiles = fs
    .readdirSync(filePath)
    .filter((item) => item !== '.gitkeep');

  fontFiles.forEach((font) => {
    // eg. "albert_sans"
    const fontFixedName = font.replace(font.split('_').pop()!, '').slice(0, -1);
    const fontInUse = fontDownloadUrls.find(
      (item) => fontFixedName === getFontName(item)
    );

    // eg. "Albert Sans"
    const fontName = usedFontNames.find(
      (item) => item.toLowerCase().replaceAll(' ', '_') === fontFixedName
    );

    if (!fontName) return;

    if (!fontInUse && fontFixedName) {
      fs.unlinkSync(path.join(filePath, font));

      if (fs.existsSync(path.join(androidFilePath, font))) {
        fs.unlinkSync(path.join(androidFilePath, font));
      }

      if (fs.existsSync(path.join(androidFilePath, `${fontFixedName}.xml`))) {
        fs.unlinkSync(path.join(androidFilePath, `${fontFixedName}.xml`));

        const projectPath = getProjectPath('MainApplication.kt');
        if (!projectPath) return;

        fs.readFile(projectPath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          fs.writeFile(
            projectPath,
            data.replaceAll(
              getRegisterFontText(fontName),
              // getRegisterFontText(fontName).replace('\n', '')
              ''
            ),
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

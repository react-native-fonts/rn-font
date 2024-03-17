import fs from 'fs';
import path from 'path';
import { getFontName, type Font } from './';
import { getProjectPath, getRegisterFontText } from './android-xml-fonts';

export default function cleanupUnusedFonts(
  filePath: string,
  androidFilePath: string,
  fontDownloadUrls: Font[]
) {
  const fontFiles = fs.readdirSync(filePath);

  fontFiles.forEach((font) => {
    const fontName = font.split('.').shift();
    const fontInUse = fontDownloadUrls.find(
      (item) => fontName === getFontName(item)
    );

    if (!fontInUse && fontName) {
      fs.unlinkSync(path.join(filePath, font));

      if (fs.existsSync(path.join(androidFilePath, font))) {
        fs.unlinkSync(path.join(androidFilePath, font));
      }
      if (fs.existsSync(path.join(androidFilePath, `${fontName}.xml`))) {
        fs.unlinkSync(path.join(androidFilePath, `${fontName}.xml`));

        const projectPath = getProjectPath('MainApplication.kt');
        if (!projectPath) return;

        fs.readFile(projectPath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          fs.writeFile(
            projectPath,
            data.replace(getRegisterFontText(fontName), ''),
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

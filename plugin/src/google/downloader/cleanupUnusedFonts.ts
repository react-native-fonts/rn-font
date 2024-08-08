import fs from 'fs';
import path from 'path';
import { getProjectPath, getRegisterFontText } from './android';

export default function cleanupUnusedFonts(
  filePath: string,
  androidFilePath: string,
  usedFontNames: string[]
) {
  const fontFiles = fs
    .readdirSync(filePath)
    .filter((item) => item !== '.gitkeep');

  console.log(fontFiles, 'fontFiles');

  fontFiles.forEach((font) => {
    // eg. "albert_sans"
    const fontFixedName = font.replace(font.split('_').pop()!, '').slice(0, -1);

    // eg. "Albert Sans"
    const fontInUse = usedFontNames
      .map((item) => item.toLowerCase().replaceAll(' ', '_'))
      .includes(fontFixedName.toLowerCase().replaceAll(' ', '_'));
    console.log(fontInUse, 'font in use', fontFixedName, usedFontNames);
    console.log(fontFixedName, 'font fixed name');
    console.log(usedFontNames, 'used font names');

    if (fontInUse) return;

    const fontName = usedFontNames.find(
      (item) =>
        item.toLowerCase().replaceAll(' ', '_') === fontFixedName.toLowerCase()
    );
    console.log(fontName, 'font name');
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

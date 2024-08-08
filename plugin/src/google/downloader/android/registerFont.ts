import fs from 'fs';
import { getProjectPath } from './';

export const getRegisterFontText = (fontFamily: string) => {
  return `ReactFontManager.getInstance().addCustomFont(this, "${fontFamily}", R.font.${fontFamily
    .toLowerCase()
    .replaceAll(' ', '_')})`;
};

export default function registerFont(fontFamily: string) {
  //TODO: if rn version is < 0.73 then add import to MainApplication.java
  const projectPath = getProjectPath('MainApplication.kt');
  if (!projectPath) return;

  const importText = `import com.facebook.react.common.assets.ReactFontManager\n`;
  const registerFontText = getRegisterFontText(fontFamily);

  fs.readFile(projectPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data.includes(importText) && data.includes(registerFontText)) return;

    // Find the place to add a new import
    const importIndex = data.indexOf('import android.app.Application');
    const onCreateIndex = data.indexOf('super.onCreate()');

    if (importIndex === -1 && onCreateIndex === -1) {
      console.error('Cannot find a place to add an import or register a font.');
      return;
    }

    const newData =
      data.slice(0, importIndex + 1) +
      (data.includes(importText) ? '' : importText + '\n') +
      data.slice(importIndex + 1, onCreateIndex + 16) +
      (!data.includes(registerFontText) ? '\n\t' + registerFontText : '') +
      data.slice(onCreateIndex + 16);

    fs.writeFile(projectPath, newData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}

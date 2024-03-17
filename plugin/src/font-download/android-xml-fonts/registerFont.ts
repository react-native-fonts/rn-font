import fs from 'fs';
import { getProjectPath } from './';
export default function registerFont(fontFamily: string) {
  //TODO: if rn version is < 0.73 then add import to MainApplication.java
  const projectPath = getProjectPath('MainApplication.kt');
  if (!projectPath) return;

  const importText = `import com.facebook.react.common.assets.ReactFontManager\n`;
  const registerFontText = `\n\t\tReactFontManager.getInstance().addCustomFont(this, "${fontFamily}", R.font.${fontFamily
    .toLowerCase()
    .replaceAll(' ', '_')})`;

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
      data.slice(0, importIndex) +
      (!data.includes(importText) ? importText : '') +
      data.slice(importIndex, onCreateIndex + 16) +
      (!data.includes(registerFontText) ? registerFontText : '') +
      data.slice(onCreateIndex + 16);

    fs.writeFile(projectPath, newData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Import added to MainApplication.kt');
    });
  });
}

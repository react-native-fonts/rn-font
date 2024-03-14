import fs from 'fs';
import path from 'path';

export function addImportToFile() {
  //read folder name in ./android/app/src/main/java/com/ path

  // Funkcja do znalezienia folderu w katalogu "com", który zawiera plik "MainApplication.java"
  function getProjectFilePath(fileName: string) {
    const comDirectory = path.join(
      process.cwd(),
      './android/app/src/main/java/com'
    );

    const folders = fs
      .readdirSync(comDirectory)
      .filter((file) =>
        fs.statSync(path.join(comDirectory, file)).isDirectory()
      );

    const projectName = folders?.[0];

    if (!projectName)
      return console.error(`Expected folder in '${comDirectory}'`);

    if (folders.length !== 1) {
      return console.error(
        `Expected one folder in '${comDirectory}', found ${folders.length}.`
      );
    }
    return path.join(comDirectory, projectName, fileName);
  }

  const projectPath = getProjectFilePath('MainApplication.java');

  console.log(projectPath, 'file path asdasd');
  // const filePath = path.join(
  //   process.cwd(),
  //   `./android/app/src/main/java/com/${projectName}/MainApplication.java`
  // );
  //
  // console.log(filePath);
  //
  // const importText =
  //   'import com.facebook.react.common.assets.ReactFontManager;';
  // fs.readFile(filePath, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //
  //   if (data.includes(importText)) return;
  //
  //   // Szukanie miejsca, w którym należy dodać nowy import
  //   const importIndex = data.indexOf('import android.app.Application');
  //
  //   if (importIndex === -1) {
  //     console.error('Nie można znaleźć miejsca na dodanie importu');
  //     return;
  //   }
  //
  //   // Dodanie nowego importu
  //   const newData =
  //     data.slice(0, importIndex) + importText + '\n' + data.slice(importIndex);
  //
  //   // Zapis nowych danych do pliku
  //   fs.writeFile(filePath, newData, 'utf8', (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log('Nowy import został dodany do pliku.');
  //   });
  // });
}

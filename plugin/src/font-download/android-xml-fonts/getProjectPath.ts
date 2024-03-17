import path from 'path';
import fs from 'fs';

export default function getProjectPath(fileName?: string) {
  const comDirectory = path.join(
    process.cwd(),
    './android/app/src/main/java/com'
  );

  const folders = fs
    .readdirSync(comDirectory)
    .filter((file) => fs.statSync(path.join(comDirectory, file)).isDirectory());

  const projectName = folders?.[0];

  if (!projectName)
    return console.error(`Expected folder in '${comDirectory}'`);

  if (folders.length !== 1) {
    return console.error(
      `Expected one folder in '${comDirectory}', found ${folders.length}.`
    );
  }
  return path.join(comDirectory, projectName, fileName || '');
}

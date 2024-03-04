import { spawn, kill } from 'react-native-childprocess';

let cmdID;

export async function start() {
  console.log('dupa');
  try {
    cmdID = await spawn(`tsx src/font/google/getFontFile.ts`, [], {
      pwd: './',
      stdout: (output) => {
        console.log('>>>', output);
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function stop() {
  kill(cmdID);
}

export const test = () => {
  start();
};

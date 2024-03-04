// import fs from 'fs';
// import https from 'https';
// import { FontError } from '../../errors/FontError';

async () => {
  console.log('test', process.argv);

  // const req = await fetch(fontUrl);
  // const css = await req.text();

  // const match = css.match(/src:\s*url\(['"]?([^'"]+)['"]?\)/);

  // if (match && match[1]) {
  //   const url = match[1];

  //   https.get(url, (res: any) => {
  //     const fileStream = fs.createWriteStream('./fonts/font.woff2');
  //     res.pipe(fileStream);
  //     fileStream.on('finish', () => {
  //       fileStream.close();
  //     });
  //   })
  // } else {
  //     FontError("FONT_URL",'Unable to find font url');
  // }
};

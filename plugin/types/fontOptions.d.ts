declare namespace fontOptions {
  function watchDirChanges(): void;
  function readFontOptionsFilesPath(): string[];
  function createFontAxesFile(filePath: string, fontCache: any): void;
}
export default fontOptions;

declare namespace fontOptions {
  function watchDirChanges(): void;
  function readFontOptionsFilesPath(): string[];
  function createFontOptionsFile(filePath: string, fontCache: any): void;
}
export default fontOptions;

export type Font = {
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  src: string;
};
export default function getFontDownloadUrls(
  fontsGoogleURls: string[]
): Promise<Font[]>;

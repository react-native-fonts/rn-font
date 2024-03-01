export class CodedError extends Error {
  code: string;
  info?: any;

  constructor(code: string, message: string) {
    console.error(`[${code}]:`, message);
    super(message);
    this.code = code;
  }
}

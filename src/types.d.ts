export interface MediaData {
  name?: string;
  original?: string;
  year?: string;
  key?: string;
  url?: string;
  identifier?: string;
  type?: string;
}

export interface StorageMedia { [key: string]: MediaData }

export type Parser = (a: string, b: string) => Promise<MediaData>

export interface ParsersFunctions {
    parser: Parser;
    regex: RegExp;
}

export interface ParsersObject {
  [key: string]: ParsersFunctions;
}
type Googlekeys = "mediaInfo"
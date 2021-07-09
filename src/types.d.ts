export interface ChapterLink {
  number?: string;
  chapterLink?: string[];
  url?: string;
}

export interface MediaData {
  name?: string;
  original?: string;
  year?: string;
  key?: string;
  url?: string;
  identifier?: string;
  type?: string;
}

export interface SeriesLinks {
  name?: string;
  total?: number;
  url?: string;
  chapters?: ChapterLink[];
  currentChapter?: ChapterLink;
}

export interface StorageSeries { [key: string]: MediaData }
export interface StorageNames { [key: string]: string }
export type Parser = (a: string, b: string) => Promise<MediaData>
export interface ParsersFunctions {
    parser: Parser;
    regex: RegExp;
}

export interface ParsersObject {
  [key: string]: ParsersFunctions;
}

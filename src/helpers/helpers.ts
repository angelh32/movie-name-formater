import { ChapterLink, MediaData } from "../types";

export function parseInside(text: string, start: string, end: string): string {
  try {
    const local2 = text.split(start)
    return local2[1].split(end)[0]
  } catch (error) {
    return "XXXXXXXX"
  }
}

export function compareChapters(a: ChapterLink, b: ChapterLink) {
  const numberOne = parseInt(a.number.replace(/.*-/, ""))
  const numberTwo  = parseInt(b.number.replace(/.*-/, ""))
  if (numberOne<numberTwo) {
    return -1;
  }
  if (numberOne>numberTwo) {
    return 1;
  }
  return 0;
}

export function buildComposedName(mediaData: MediaData): string{
  return `${mediaData.name} (${mediaData.year}) [${mediaData.identifier}=${mediaData.key}]`;
}
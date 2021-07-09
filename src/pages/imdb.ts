import { parseInside } from "../helpers/helpers";
import * as Promise from "bluebird"
import { MediaData, ChapterLink } from "../types";
import { message } from "../helpers/messages";
const imdbIdentifier = "imdbid";
export function parseImdbData(url: string, body: string): Promise<MediaData> {
  return Promise.join(
    parseId(url),
    parseData(body),
    (id, data)=>{
      data.key=id;
      data.url=url;
      return data;
    });
}

export function parseId(url: string): Promise<string> {
  if (!url){
    return Promise.reject(message.errorLink);
  }
  return Promise.resolve("tt"+parseInside(url, '/tt','/?'));
}

export function parseData(body: string): Promise<MediaData> {
  if (!body){
    return Promise.reject(message.errorLink);
  }
  const baseHtml = parseInside(body, 'hero-title-block__title','TitleBlockMetaData__ListItemText');
  const mediaNameTemp = parseInside(baseHtml, 'TitleHeader__TitleText','/h1>');
  const mediaName = parseInside(mediaNameTemp, '>','<');
  const mediaOriginalName = parseInside(baseHtml, 'Original title: ','</div>');
  const mediaYearTemp = parseInside(baseHtml, 'StyledTextLin','/a>');
  const mediaYear = parseInside(mediaYearTemp, '>','<');
  const mediadata: MediaData = {
    name: mediaName,
    original: mediaOriginalName,
    year: mediaYear,
    identifier: imdbIdentifier
  }
  return Promise.resolve(mediadata);
}

export function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => fetch(url).then(html => {
    return resolve(html.clone().text());
  }));
}
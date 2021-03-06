import * as Promise from "bluebird";
import { saveMovie } from "./helpers/chrome";
import { message } from "./helpers/messages";
import { parseImdbData } from "./pages/imdb";
import { MediaData, Parser, ParsersObject } from "./types";

export function getMediaData(firsturl: string, body: any): Promise<MediaData> {
  return checkUrlCompatibility(firsturl).then((parserFunction) => {
    return parserFunction(firsturl, body)
      .then(saveMovie)
  });
}

const pageParsers: ParsersObject = {
  "imdb": {
    // https://www.imdb.com/title/tt0391198/?ref_=nm_knf_i2
    regex: /.*imdb.com\/title\/.*$/,
    parser: parseImdbData,
  },
  "aniList": {
    // https://anilist.co/anime/124194/Fruits-Basket-The-Final/
    regex: /.*anilist.co\/anime\/.*$/,
    parser: parseImdbData,
  }
}

export function checkUrlCompatibility(url: string): Promise<Parser> {
  return new Promise((resolve, reject) => {
    const keys: string[] = Object.keys(pageParsers);
    const isCompatible: Parser[] = keys.map((value) => {
      const regex = pageParsers[value].regex
      if (regex.test(url)) {
        return pageParsers[value].parser;
      }
      return null;
    })
    const validFunction = isCompatible.filter((value) => value)
    if (validFunction.length === 1) {
      return resolve(validFunction[0]);
    }
    return reject(message.errorUrl)
  })
}
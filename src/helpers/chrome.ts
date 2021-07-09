import { SeriesLinks, ChapterLink, StorageSeries, MediaData } from "../types";
import { compareChapters, buildComposedName } from "./helpers";
import * as Promise from "bluebird"

type Googlekeys = "seriesNames" | "seriesLinks"
const series: Googlekeys = "seriesLinks"
const names: Googlekeys = "seriesNames"

/************ Storage structure ***********
 * sereies: SeriesLinks[]
 */
type Storage = chrome.storage.LocalStorageArea;
const outStorage: Storage = chrome.storage.local;

export function saveMovie(media: MediaData, saveChapter = false, storage = outStorage): Promise<string> {
  return getSerie(media.name).then(currentSerie => {
    if (currentSerie && !saveChapter) {
      return currentSerie.name;
    }
    return getPromisified(series).then(seriesNames => {
      return savePromisified({
        [series]: {
          ...seriesNames,
          [media.key]: media
        }
      })
        .then(() => {
          return media.name
        })
    })
  })

}

export function updateNames() {
  return getPromisified(series)
    .then((savedObject: StorageSeries) => {
      return savePromisified({ [names]: Object.keys(savedObject).map(key=>{
        const current = savedObject[key]
        return buildComposedName(current);
      }) });
    });
}

export function getNames(storage = outStorage): Promise<string[]> {
  return getPromisified(names, true).then((value: string[])=>{
    return value;
  })
}

export function checkChapter(serieName: string, chapterUrl: string, storage = outStorage): Promise<void> {
  const chapterNumber = chapterUrl.replace(/.*\//, "")
  return getSerie(serieName).then(currentSerie => {
    const exist = currentSerie.chapters.filter(chapter=>chapterUrl===chapter.url)
    if (exist.length>0){
      return Promise.reject(new Error(`The chapter ${chapterNumber} was saved previously`))
    }
    return;
  })
}

export function saveChapter(serieName: string, chapter: ChapterLink, storage = outStorage): Promise<ChapterLink> {
  return getSerie(serieName).then(currentSerie => {
    const builtSerie = {
      ...currentSerie,
      chapters: [...currentSerie.chapters, chapter]
    }
    return saveMovie(builtSerie, true).then(() => chapter);
  })
}

export function sortChapter(serieName: string, storage = outStorage): Promise<string> {
  return getSerie(serieName).then(currentSerie => {
    const sorted = currentSerie.chapters.sort(compareChapters);
    const builtSerie = {
      ...currentSerie,
      chapters: sorted
    }
    return saveMovie(builtSerie, true).then(() => serieName);
  })
}

export function getSerie(serieName: string, storage = outStorage): Promise<SeriesLinks> {
  console.log("file: chrome.ts ~ line 88 ~ getSerie ~ serieName", serieName)
  return getPromisified(series).then((value: StorageSeries) => {
    return value[serieName]
  })
}

function getPromisified(key, array = false, storage = outStorage): Promise<any> {
  return new Promise((resolve, reject) => {
    return storage.get(key, function (items) {
      if (items[key]) {
        return resolve(items[key]);
      }
      return resolve(array ? [] : {})
    });
  });
}

function savePromisified(object: Object, storage = outStorage): Promise<any> {
  return new Promise((resolve, reject) => {
    return storage.set(object, () => {
      return resolve(object)
    });
  })
}

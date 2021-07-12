import * as Promise from "bluebird";
import { Googlekeys, MediaData, StorageMedia } from "../types";

const mediaInfo: Googlekeys = "mediaInfo"

/************ Storage structure ***********
 * mediaInfo: [media:key:media]
 */
type Storage = chrome.storage.LocalStorageArea;
const outStorage: Storage = chrome.storage.local;

export function saveMovie(media: MediaData, saveChapter = false): Promise<MediaData> {
  return getSerie(media.name).then((currentMedia: MediaData) => {
    if (currentMedia) {
      return currentMedia;
    }
    return getPromisified(mediaInfo).then(storage => {
      return savePromisified({
        [mediaInfo]: {
          ...storage,
          [media.key]: media
        }
      })
        .then(() => {
          return media
        })
    })
  })

}


export function getMediaFromStorage(): Promise<MediaData[]> {
  return getPromisified(mediaInfo).then((mediaFromStorage:StorageMedia)=>{
    const currentKeys = Object.keys(mediaFromStorage);
    return currentKeys.map(key=>{
      return mediaFromStorage[key]
    })
  });
}


export function getSerie(mediaName: string): Promise<MediaData> {
  return getPromisified(mediaInfo).then((value: StorageMedia) => {
    return value[mediaName]
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

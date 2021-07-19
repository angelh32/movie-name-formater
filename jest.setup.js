Object.assign(global, require('jest-chrome'))
let data = {}
global.chrome.storage.local = {
  get: (key, callback) => {
    return callback(data)
  },
  set: (localObject, callback) => {
    data = localObject;
    return callback(localStorage)
  }
}
import { MediaData } from "../types"
import { saveMovie, getMovie, getMediaFromStorage, savePromisified} from "./chrome"
import { message } from "./messages"

describe("Storage functions", () => {
  beforeEach(()=>{
    return savePromisified({});
  })
  const testMovie: MediaData = {
    name: "asd",
    year: "123",
    key: "tt000000",
    url: "http://asd.asd/asd",
    identifier: "imdbid",
    type: "movie",
  }
  describe("#saveMovie", () => {
    test("when the movie is undefined, it rejects", () => {
      return expect(saveMovie(undefined)).rejects.toBe(message.errorMedia)
    })
    test("when movie is correct, it resolves", () => {
      return expect(saveMovie(testMovie)).resolves.toBe(testMovie)
    })
  })
  describe("#getMovie", () => {
    test("when the movie desnt exist, it returns empty object", () => {
        return expect(getMovie(testMovie.key)).resolves.toBe(null)
    })
    test("when the movie exist, it returns the movie", () => {
      return saveMovie(testMovie).then(() => {
        return expect(getMovie(testMovie.key)).resolves.toBe(testMovie)
      })
    })
  })
  describe("#getMediaFromStorage", () => {
    test("when the storage is empty desnt exist, it returns empty object", () => {
        return expect(getMediaFromStorage()).resolves.toStrictEqual([])
    })
    test("when the storage has items, it returns a list", () => {
      return saveMovie(testMovie).then(() => {
        return expect(getMediaFromStorage()).resolves.toStrictEqual([testMovie])
      })
    })
  })
})
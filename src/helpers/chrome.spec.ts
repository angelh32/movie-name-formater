import { saveMovie } from "./chrome"
import { MediaData } from "../types"

describe("#checkUrlCompatibility", () => {
  const testMovie: MediaData = {
    name: "asd",
    year: "123",
    key: "tt000000",
    url: "http://asd.asd/asd",
    identifier: "imdbid",
    type: "movie",
  }
  test("when url is empty", () => {
    return expect(saveMovie(testMovie)).resolves.toBe(true)
  })
})
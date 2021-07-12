import { MediaData } from "../types"
import { saveMovie } from "./chrome"

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
    return saveMovie(testMovie).then(data=>{
      return expect(data).toBe(true)
    })
  })
})
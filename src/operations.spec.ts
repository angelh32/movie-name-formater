import { MediaData, message } from "./helpers/messages";
import { checkUrlCompatibility } from "./operations";
export type Parser = (a: string, b: string) => Promise<MediaData>

describe("#checkUrlCompatibility", () => {
  test("when url is empty", () => {
    return expect(checkUrlCompatibility("")).rejects.toBe(message.errorUrl)
  })
  test("when url is from another page", () => {
    return expect(checkUrlCompatibility("https://xxx.ru")).rejects.toBe(message.errorUrl)
  })

  test("when the url is from imdb", () => {
    return expect(checkUrlCompatibility("https://www.imdb.com/title/tt0000000/?ref_=nm_knf_i2")).resolves.toBeInstanceOf(Function);
  })
  test("when there is the main page", () => {
    return expect(checkUrlCompatibility("https://anilist.co/anime/124194/Fruits-Basket-The-Final/")).resolves.toBeInstanceOf(Function);
  })
})
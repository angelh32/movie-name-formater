import { parseId, parseData } from "./imdb";
import { message } from "../helpers/messages";
import { readFileSync } from 'fs';
import * as path from 'path';
import { MediaData } from "../types";

describe("Imdb Operations", () => {
  describe("#parseId", () => {
    describe("when link is incorrect", () => {
      test("it rejects empty", () => {
        return expect(
          parseId("")
        ).rejects.toMatch(message.errorLink);
      })
      test("it rejects null", () => {
        return expect(
          parseData(null)
        ).rejects.toMatch(message.errorLink);
      })
    })
    test("when url is correct it returns the id", () => {
      return expect(
        parseId("https://www.ssss.xxx/xxxxxx/tt0000000/?ref_=xx_xxx_xx")
      ).resolves.toBe("tt0000000");
    })
  })
  describe("#parseData", () => {
    describe("when body is incorrect", () => {
      test("it rejects empty", () => {
        return expect(
          parseData("")
        ).rejects.toMatch(message.errorLink);
      })
      test("it rejects null", () => {
        return expect(
          parseData(null)
        ).rejects.toMatch(message.errorLink);
      })
    })
    test.only("when url is correct it return the data", () => {
      const file = path.join(__dirname, "example.imdb.txt");
      const body: string = readFileSync(file, 'utf8');
      const result: MediaData = {
        name: "El grito",
        original: "The Grudge",
        year: "2004",
        identifier: "imdbid",
      }
      return expect(
        parseData(body)
      ).resolves.toStrictEqual(result);
    })
  })
})
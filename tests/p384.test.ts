import { WitnessTester } from "circomkit";
import { hexToBigInt, splitToWords } from "../src";
import { circomkit } from "./common";
import P384TestCases from "./testcases/p384.json";

describe("ECDSA P384", () => {
  let circuit: WitnessTester<["a", "b"], ["out"]>;

  const G_X = hexToBigInt(
    "aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"
  );
  const G_Y = hexToBigInt(
    "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"
  );

  const G_X_WORDS = splitToWords(G_X, 48n, 8n);
  const G_Y_WORDS = splitToWords(G_Y, 48n, 8n);
  const G_WORDS = [G_X_WORDS, G_Y_WORDS];

  describe("ECDSA Point Addition", () => {
    before(async () => {
      circuit = await circomkit.WitnessTester(`P384AddUnequal_64_6`, {
        file: "p384",
        template: "P384AddUnequal",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    describe("It should pass all test cases for ECDSA Point Addition", async () => {
      for (let i = 1; i < 19; i++) {
        // Test case k=20 : we don't have result for that
        const currentPoint = P384TestCases[i];
        const currentPoint_X = currentPoint.x;
        const currentPoint_Y = currentPoint.y;

        const currentPoint_X_WORDS = splitToWords(hexToBigInt(currentPoint_X), 48n, 8n);
        const currentPoint_Y_WORDS = splitToWords(hexToBigInt(currentPoint_Y), 48n, 8n);
        const currentPoint_WORDS = [currentPoint_X_WORDS, currentPoint_Y_WORDS];

        const RESULT = P384TestCases[i + 1];
        const RESULT_X = RESULT.x;
        const RESULT_Y = RESULT.y;

        const RESULT_X_WORDS = splitToWords(hexToBigInt(RESULT_X), 48n, 8n);
        const RESULT_Y_WORDS = splitToWords(hexToBigInt(RESULT_Y), 48n, 8n);
        const RESULT_WORDS = [RESULT_X_WORDS, RESULT_Y_WORDS];

        it(`It should compute ${currentPoint.k}G + G == ${RESULT.k}G`, async () => {
          await circuit.expectPass({ a: G_WORDS, b: currentPoint_WORDS }, { out: RESULT_WORDS });
        });
      }
    });
  });
});

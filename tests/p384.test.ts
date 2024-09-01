import { WitnessTester } from "circomkit";
import { hexToBigInt, splitToWords } from "../src";
import { circomkit } from "./common";
import P384TestCases from "./testcases/p384.json";

describe("ECDSA P384", () => {
  const G_X = hexToBigInt(
    "aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"
  );
  const G_Y = hexToBigInt(
    "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"
  );

  const G_X_WORDS = splitToWords(G_X, 48n, 8n);
  const G_Y_WORDS = splitToWords(G_Y, 48n, 8n);
  const G_WORDS = [G_X_WORDS, G_Y_WORDS];

  describe("ECDSA Point Addition Unequal", () => {
    let circuit: WitnessTester<["a", "b"], ["out"]>;
    before(async () => {
      circuit = await circomkit.WitnessTester(`P384AddUnequal_48_8`, {
        file: "p384",
        template: "P384AddUnequal",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    describe("should compute properly", async () => {
      for (let i = 1; i < 19; i++) {
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

        it(`for ${currentPoint.k}G + G == ${RESULT.k}G`, async () => {
          await circuit.expectPass({ a: G_WORDS, b: currentPoint_WORDS }, { out: RESULT_WORDS });
        });
      }
    });
  });

  describe("ECDSA Point Addition Equal", () => {
    let circuit: WitnessTester<["in"], ["out"]>;
    before(async () => {
      circuit = await circomkit.WitnessTester(`P384Double_48_8`, {
        file: "p384",
        template: "P384Double",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    it("should compute properly", async () => {
      const G_X_2 = splitToWords(hexToBigInt(P384TestCases[1].x), 48n, 8n);
      const G_Y_2 = splitToWords(hexToBigInt(P384TestCases[1].y), 48n, 8n);
      const G_2_WORDS = [G_X_2, G_Y_2];

      await circuit.expectPass({ in: G_WORDS }, { out: G_2_WORDS });
    });
  });

  describe("ECDSA Scalar Multiplication", () => {
    let circuit: WitnessTester<["scalar", "point"], ["out"]>;
    before(async () => {
      circuit = await circomkit.WitnessTester(`P384ScalarMult_48_8`, {
        file: "p384",
        template: "P384ScalarMult",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    describe("should compute properly", async () => {
      for (let i = 23; i < 24; i++) {
        const currentPoint = P384TestCases[i];
        const currentPoint_X = currentPoint.x;
        const currentPoint_Y = currentPoint.y;
        const currentPoint_X_WORDS = splitToWords(hexToBigInt(currentPoint_X), 48n, 8n);
        const currentPoint_Y_WORDS = splitToWords(hexToBigInt(currentPoint_Y), 48n, 8n);
        const currentPoint_WORDS = [currentPoint_X_WORDS, currentPoint_Y_WORDS];

        it(`for ${currentPoint.k}.G`, async () => {
          await circuit.expectPass(
            { scalar: splitToWords(BigInt(P384TestCases[i].k), 48n, 8n), point: G_WORDS },
            { out: currentPoint_WORDS }
          );
        });
      }
    });
  });
});

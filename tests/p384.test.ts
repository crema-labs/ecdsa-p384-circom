import { WitnessTester } from "circomkit";
import elliptic from "elliptic";
import { hexToBigInt, splitToWords } from "../src";
import { circomkit } from "./common";

describe("ECDSA P384", () => {
  let circuit: WitnessTester<["a", "b"], ["out"]>;
  const EC = new elliptic.ec("p384");

  const p1 = EC.genKeyPair().getPublic();
  const p2 = EC.genKeyPair().getPublic();

  const p1_x = hexToBigInt(p1.getX().toString(16));
  const p1_y = hexToBigInt(p1.getY().toString(16));
  const p2_x = hexToBigInt(p2.getX().toString(16));
  const p2_y = hexToBigInt(p2.getY().toString(16));

  const p1_x_words = splitToWords(BigInt(p1_x), 48n, 8n);
  const p1_y_words = splitToWords(BigInt(p1_y), 48n, 8n);
  const p2_x_words = splitToWords(BigInt(p2_x), 48n, 8n);
  const p2_y_words = splitToWords(BigInt(p2_y), 48n, 8n);

  const p1_words = [p1_x_words, p1_y_words];
  const p2_words = [p2_x_words, p2_y_words];

  describe("ECDSA Point Addition", () => {
    before(async () => {
      circuit = await circomkit.WitnessTester(`P384AddUnequal_64_6`, {
        file: "p384",
        template: "P384AddUnequal",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    it("It Should have", async () => {
      await circuit.calculateWitness({ a: p1_words, b: p2_words });
    });
  });
});

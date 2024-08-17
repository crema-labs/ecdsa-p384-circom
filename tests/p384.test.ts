import { WitnessTester } from "circomkit";
import elliptic from "elliptic";
import { hexToBigInt, splitToWords } from "../src";
import { circomkit } from "./common";

describe("ECDSA P384", () => {
  let circuit: WitnessTester<["a", "b"], ["out"]>;
  const EC = new elliptic.ec("p384");

  const G_X = hexToBigInt("aa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7");
  const G_Y = hexToBigInt("3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f");

  const P_X = hexToBigInt("08D999057BA3D2D969260045C55B97F089025959A6F434D651D207D19FB96E9E4FE0E86EBE0E64F85B96A9C75295DF61");
  const P_Y = hexToBigInt("8E80F1FA5B1B3CEDB7BFE8DFFD6DBA74B275D875BC6CC43E904E505F256AB4255FFD43E94D39E22D61501E700A940E80");

  const OUT_X = hexToBigInt("077A41D4606FFA1464793C7E5FDC7D98CB9D3910202DCD06BEA4F240D3566DA6B408BBAE5026580D02D7E5C70500C831");
  const OUT_Y = hexToBigInt("C995F7CA0B0C42837D0BBE9602A9FC998520B41C85115AA5F7684C0EDC111EACC24ABD6BE4B5D298B65F28600A2F1DF1");

  const G_X_WORDS = splitToWords(G_X, 48n, 8n);
  const G_Y_WORDS = splitToWords(G_Y, 48n, 8n);
  const G_WORDS = [G_X_WORDS, G_Y_WORDS]; 

  const P_X_WORDS = splitToWords(P_X, 48n, 8n);
  const P_Y_WORDS = splitToWords(P_Y, 48n, 8n);
  const P_WORDS = [P_X_WORDS, P_Y_WORDS];

  const OUT_X_WORDS = splitToWords(OUT_X, 48n, 8n);
  const OUT_Y_WORDS = splitToWords(OUT_Y, 48n, 8n);
  const OUT_WORDS = [OUT_X_WORDS, OUT_Y_WORDS];

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
      await circuit.expectPass({ a: G_WORDS, b: P_WORDS }, {out: OUT_WORDS });
    });
  });
});

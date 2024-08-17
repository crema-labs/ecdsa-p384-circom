import { WitnessTester } from "circomkit";
import crypto from "crypto";
import elliptic from "elliptic";
import { splitToWords } from "../src";
import { circomkit } from "./common";

describe("ECDSA P384", () => {
  describe.only("ECDSA P384 Signature Verify", () => {
    let circuit: WitnessTester<["r", "s", "msghash", "pubkey"], ["result"]>;
    const EC = new elliptic.ec("p256");
    const keyPair = EC.genKeyPair();

    let message = "Crema Labs";
    let messageHash = crypto.createHash("sha384").update(message).digest("hex");
    let message_words = splitToWords(BigInt("0x" + messageHash), 48n, 8n);

    const pubKey = keyPair.getPublic();

    let signature = keyPair.sign(message.toString());
    let signature_r = BigInt(signature.r.toString());
    let signature_s = BigInt(signature.s.toString());
    let pubKey_X = BigInt(pubKey.getX().toString());
    let pubKey_Y = BigInt(pubKey.getY().toString());

    let signature_r_words = splitToWords(signature_r, 48n, 8n);
    let signature_s_words = splitToWords(signature_s, 48n, 8n);
    let pubKey_X_words = splitToWords(pubKey_X, 48n, 8n);
    let pubKey_Y_words = splitToWords(pubKey_Y, 48n, 8n);

    console.log("message:", pubKey_X_words, pubKey_Y_words);

    before(async () => {
      circuit = await circomkit.WitnessTester(`ECDSAVerifyNoPubkeyCheck_48_8`, {
        file: "ecdsa",
        template: "ECDSAVerifyNoPubkeyCheck",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    it("should verify a valid signature", async () => {
      await circuit.expectPass(
        {
          r: signature_r_words,
          s: signature_s_words,
          msghash: message_words,
          pubkey: [pubKey_X_words, pubKey_Y_words],
        },
        { result: 1 }
      );
    });
  });
});

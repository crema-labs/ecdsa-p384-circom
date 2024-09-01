import { WitnessTester } from "circomkit";
import crypto from "crypto";
import { ec } from "elliptic";
import { hexToBigInt, splitToWords } from "../src";
import { circomkit } from "./common";
import { decode } from "./utils";

describe("ECDSA", () => {
  describe("should be able to verify signature", () => {
    let circuit: WitnessTester<["r", "s", "msghash", "pubkey"], ["result"]>;

    before(async () => {
      circuit = await circomkit.WitnessTester(`ECDSAVerifyNoPubkeyCheck_48_8`, {
        file: "ecdsa",
        template: "ECDSAVerifyNoPubkeyCheck",
        params: [48, 8],
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    it("should be able to verify signatures", () => {
      const p384 = new ec("p384");
      const keyPair = p384.genKeyPair();

      const msgHash = crypto.createHash("sha384").update("hello world").digest("hex");
      const wrongMessageHash = crypto.createHash("sha384").update("Sui Sui").digest("hex");
      const signature = keyPair.sign(msgHash);

      const decodedRes = decode(Uint8Array.from(signature.toDER()));
      const r = splitToWords(hexToBigInt(Buffer.from(decodedRes.r).toString("hex")), 48n, 8n);
      const s = splitToWords(hexToBigInt(Buffer.from(decodedRes.s).toString("hex")), 48n, 8n);

      const pubkey = Buffer.from(keyPair.getPublic("hex"), "hex");
      const pubkey_x = splitToWords(hexToBigInt(pubkey.subarray(1, 1 + 48).toString("hex")), 48n, 8n);
      const pubkey_y = splitToWords(hexToBigInt(pubkey.subarray(49, 49 + 48).toString("hex")), 48n, 8n);

      circuit.expectPass(
        { r, s, msghash: splitToWords(hexToBigInt(wrongMessageHash), 48n, 8n), pubkey: [pubkey_x, pubkey_y] },
        { result: "0" }
      );

      circuit.expectPass(
        { r, s, msghash: splitToWords(hexToBigInt(msgHash), 48n, 8n), pubkey: [pubkey_x, pubkey_y] },
        { result: "1" }
      );
    });
  });
});

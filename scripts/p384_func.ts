import elliptic from "elliptic";
import { hexToBigInt, splitToWords } from "../src";

const EC = new elliptic.ec("p256");

const N = hexToBigInt(EC.curve.n.toString(16));
const P = hexToBigInt(EC.curve.p.toString(16));
const A = BigInt("115792089210356248762697446949407573530086143415290314195533631308867097853948");
const B = BigInt("41058363725152142129326129780047268409114441015993725554835256314039467401291");

console.log(`N: ${N}`);
console.log(`P: ${P}`);
console.log(`A: ${A}`);
console.log(`B: ${B}`);

const n_words = splitToWords(N, 43n, 6n);
const p_words = splitToWords(P, 43n, 6n);
const a_words = splitToWords(A, 43n, 6n);
const b_words = splitToWords(B, 43n, 6n);

console.log(`n_words: ${n_words}`);
console.log(`p_words: ${p_words}`);
console.log(`a_words: ${a_words}`);
console.log(`b_words: ${b_words}`);

import elliptic from "elliptic";
import { hexToBigInt, splitToWords } from "../src";

const EC = new elliptic.ec("p384");

const N = hexToBigInt(EC.curve.n.toString(16));
const P = hexToBigInt(EC.curve.p.toString(16));
const A = hexToBigInt(EC.curve.a.toString(16));
const B = hexToBigInt(EC.curve.b.toString(16));

console.log(`N: ${N}`);
console.log(`P: ${P}`);
console.log(`A: ${A}`);
console.log(`B: ${B}`);

const n_words = splitToWords(N, 64n, 6n);
const p_words = splitToWords(P, 64n, 6n);
const a_words = splitToWords(A, 64n, 6n);
const b_words = splitToWords(B, 64n, 6n);

console.log(`n_words: ${n_words}`);
console.log(`p_words: ${p_words}`);
console.log(`a_words: ${a_words}`);
console.log(`b_words: ${b_words}`);

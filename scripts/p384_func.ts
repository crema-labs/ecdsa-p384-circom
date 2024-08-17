import elliptic from "elliptic";
import { hexToBigInt, splitToWords } from "../src";

const EC = new elliptic.ec("p384");

const N = hexToBigInt(EC.curve.n.toString(16));
const P = hexToBigInt(EC.curve.p.toString(16));
const A = hexToBigInt(EC.curve.p.toString(16)) - BigInt(3n);
const B = BigInt('0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef');

console.log(`N: ${N}`);
console.log(`P: ${P}`);
console.log(`A: ${A}`);
console.log(`B: ${B}`);

const n_words = splitToWords(N, 48n, 8n);
const p_words = splitToWords(P, 48n, 8n);
const a_words = splitToWords(A, 48n, 8n);
const b_words = splitToWords(B, 48n, 8n);

console.log(`n_words: ${n_words}`);
console.log(`p_words: ${p_words}`);
console.log(`a_words: ${a_words}`);
console.log(`b_words: ${b_words}`);

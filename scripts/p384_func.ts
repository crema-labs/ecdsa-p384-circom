import elliptic from "elliptic";
import { hexToBigInt, splitToWords, wordsToBigInt } from "../src";

const EC = new elliptic.ec("p384");

const N = hexToBigInt(EC.curve.n.toString(16));
const P = hexToBigInt(EC.curve.p.toString(16));
const A = hexToBigInt(EC.curve.p.toString(16)) - BigInt(3n);
const B = BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef");


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

console.log(wordsToBigInt(splitToWords(N, 48n, 8n), 48n, 8n));
console.log(wordsToBigInt([BigInt(74290503608976), BigInt(142204977253207), BigInt(188623521192770), BigInt(83637982657367), BigInt(150886105008335), BigInt(28306604237765), BigInt(270002625999298), BigInt(187949576258281)].reverse(), 48n, 8n));
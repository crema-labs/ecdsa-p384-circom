export function hexToBigInt(hex: string) {
  return BigInt(`0x${hex}`);
}

export function splitToWords(number: bigint, wordsize: bigint, numberElement: bigint): bigint[] {
  let t = number;
  const words: bigint[] = [];
  for (let i = BigInt(0); i < numberElement; ++i) {
    const baseTwo = BigInt(2);
    words.push(hexToBigInt(`${t % BigInt(Math.pow(Number(baseTwo), Number(wordsize)))}`));
    t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), Number(wordsize))));
  }
  if (!(t == BigInt(0))) {
    throw `Number ${number} does not fit in ${(wordsize * numberElement).toString()} bits`;
  }
  return words;
}

function internalCheck (buffer: Uint8Array): string | number {
    if (buffer[0] !== 0x30) return 'Expected DER sequence (48)'
    if (buffer[1] !== buffer.length - 2) return 'DER sequence length is invalid'
  
    if (buffer[2] !== 0x02) return 'Expected DER integer (2)'
    const lenR = buffer[3]
    if (lenR === 0) return 'R length is zero'
    if (5 + lenR >= buffer.length) return 'R length is too long'
  
    if (buffer[4 + lenR] !== 0x02) return 'Expected DER integer (2)'
    const lenS = buffer[5 + lenR]
    if (lenS === 0) return 'S length is zero'
    if ((6 + lenR + lenS) !== buffer.length) return 'S length is invalid'
  
    if ((buffer[4] & 0x80) !== 0) return 'R value is negative'
    if (lenR > 1 && (buffer[4] === 0x00) && (buffer[5] & 0x80) === 0) return 'R value excessively padded'
  
    if ((buffer[lenR + 6] & 0x80) !== 0) return 'S value is negative'
    if (lenS > 1 && (buffer[lenR + 6] === 0x00) && (buffer[lenR + 7] & 0x80) === 0) return 'S value excessively padded'
    return lenR
  }
  
  export function decode (buffer: Uint8Array): {
    r: Uint8Array
    s: Uint8Array
  } {
    const ret = internalCheck(buffer)
    if (typeof ret === 'string') {
      throw new Error(ret)
    }
    // non-BIP66 - extract R, S values
    return {
      r: buffer.subarray(4, 4 + ret),
      s: buffer.subarray(6 + ret)
    }
  }
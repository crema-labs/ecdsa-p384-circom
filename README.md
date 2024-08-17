# ecdsa-p384-circom

This repository provides implementations of Elliptic Curve Digital Signature Algorithm (ECDSA) operations for the P-384 curve using Circom. These implementations are designed for use in zero-knowledge proofs and other cryptographic applications.

> Note: These circuits not audited and not yet recommended for production use.

## Setup

```sh
$ git clone https://github.com/crema-labs/ecdsa-p384-circom
$ cd ecdsa-p384-circom
$ yarn
```

## Project Structure

In this repository, we are using [Circomkit](https://github.com/erhant/circomkit) to test some example circuits using Mocha. The circuits and the statements that they prove are as follows:

## Circuits

1. [`ecdsa.circom`](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/ecdsa.circom): Implements the ECDSA signature verification and private key to public key conversion for the P-384 curve.
   - [ECDSAPrivToPub](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/ecdsa.circom#L13) - Converts a private key to a public key in P-384.
   - [ECDSAVerifyNoPubkeyCheck](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/ecdsa.circom#L131) - Verifies an ECDSA signature for a given message and public key.
2. [`p384.circom`](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/p384.circom): Implements the basic operations for the P-384 curve.
   - [P384AddUnequal](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/p384.circom#L14) - Adds two unequal points on the P-384 curve.
   - [P384Double](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/p384.circom#L34) - Doubles a point on the P-384 curve.
   - [P384ScalarMult](https://github.com/crema-labs/ecdsa-p384-circom/blob/main/circuits/p384.circom#L56) - Multiplies a point on the P-384 curve by a scalar.

### Testing

You can use the following commands to test the circuits:

```sh
# test everything
yarn test

# test a specific circuit
yarn test -g <template-name>
```

## Benchmarks

| Operation                      | Constraints | Time (ms) |
| ------------------------------ | ----------- | --------- |
| ECDSA Signature Verification   | 4,429,227   | 4,21,394 |
| ECDSA Point Addition (Unequal) | 4,352       | 850       |
| ECDSA Point Addition (Equal)   | 6,000       | 573       |
| ECDSA Scalar Multiplication    | 3,977,848   | 4,20,964    |

# Acknowledgments

This project builds upon the excellent work of the [circom-ecdsa-p256](https://github.com/privacy-scaling-explorations/circom-ecdsa-p256) by PSE and [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa) by 0xPARC. We are grateful for their contributions to implementation of ECDSA in Circom, which formed the foundation for our work.

## Contribution

Feel free to contribute to this repository by creating issues or pull requests. We are open to any suggestions or improvements.

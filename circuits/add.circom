pragma circom 2.1.5;

template Add() {
  signal input a;
  signal input b;
  signal output out;

  out <== a + b;
}


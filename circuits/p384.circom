pragma circom 2.1.8;

include "circom-pairing/circuits/curve.circom";
include "p384_func.circom";

template P384AddUnequal(n, k) {
    assert(n == 48 && k == 8);
    signal input a[2][k];
    signal input b[2][k];

    var params[4][k] = get_p384_params();
    component adder = EllipticCurveAddUnequal(n, k, params[2]);
    adder.a <== a;
    adder.b <== b;
    
    signal output out[2][k] <== adder.out;
}
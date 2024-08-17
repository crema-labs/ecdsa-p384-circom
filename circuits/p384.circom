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

template P384Double(n, k) {
    assert(n == 48 && k == 8);
    signal input in[2][k];

    var params[4][k] = get_p384_params();
    component doubler = EllipticCurveDouble(n, k, params[0], params[1], params[2]);
    for (var i = 0; i < 8; i++) {
        doubler.in[0][i] <== in[0][i];
        doubler.in[1][i] <== in[1][i];
    }
    
    signal output out[2][k] <== doubler.out;
}
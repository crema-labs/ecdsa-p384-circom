pragma circom 2.1.8;

include "circom-pairing/circuits/curve.circom";
include "p384_func.circom";

template P384AddUnequal(n, k) {
    assert(n == 64 && k == 6);
    signal input a[2][k];
    signal input b[2][k];

    var params[4][6] = get_p384_params();
    component adder = EllipticCurveAddUnequal(n, k, params[2]);

    for (var i = 0; i < 6; i++) {
        adder.a[0][i] <== a[0][i];
        adder.a[1][i] <== a[1][i];
        adder.b[0][i] <== b[0][i];
        adder.b[1][i] <== b[1][i];
    }
    
    signal output out[2][k] <== adder.out;
}
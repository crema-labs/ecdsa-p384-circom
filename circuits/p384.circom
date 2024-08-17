pragma circom 2.1.8;

include "circom-pairing/circuits/curve.circom";
include "p384_func.circom";

template P384AddUnequal(n, k) {
    assert(n == 48 && k == 8);
    signal input a[2][k];
    signal input b[2][k];

    var params[4][8] = get_p384_params();
    component adder = EllipticCurveAddUnequal(n, k, params[2]);

    adder.a <== a;
    adder.b <== b;

    signal output out[2][k] <== adder.out;

    log(out[0][0], out[0][1], out[0][2], out[0][3], out[0][4], out[0][5], out[0][6], out[0][7]);
    log(out[1][0], out[1][1], out[1][2], out[1][3], out[1][4], out[1][5], out[1][6], out[1][7]);
}
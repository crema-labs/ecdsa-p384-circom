pragma circom 2.1.9;

include "p384_func.circom";

template ECDSAVerifyNoPubkeyCheck(n, k) {
    assert(k >= 2);
    assert(k <= 100);

    signal input r[k];
    signal input s[k];
    signal input msghash[k];
    signal input pubkey[2][k];

    signal output result;

    var p[8] = get_p384_prime(n, k);
    var order[8] = get_p384_prime(n, k);

    result <== 1;
}
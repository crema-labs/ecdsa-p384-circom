pragma circom 2.1.9;

include "p384_func.circom";
include "circom-pairing/circuits/bigint_func.circom";
include "circom-pairing/circuits/bigint.circom";

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

    // compute multiplicative inverse of s mod n
    var sinv_comp[100] = mod_inv(n, k, s, order);
    
    signal sinv[k];
    component sinv_range_checks[k];

    for (var idx = 0; idx < k; idx++) {
        sinv[idx] <-- sinv_comp[idx];
        sinv_range_checks[idx] = Num2Bits(n);
        sinv_range_checks[idx].in <== sinv[idx];
    }

    component sinv_check = BigMultModP(n, k);
    for (var idx = 0; idx < k; idx++) {
        sinv_check.a[idx] <== sinv[idx];
        sinv_check.b[idx] <== s[idx];
        sinv_check.p[idx] <== order[idx];
    }

    for (var idx = 0; idx < k; idx++) {
        if (idx > 0) {
            sinv_check.out[idx] === 0;
        }
        if (idx == 0) {
            sinv_check.out[idx] === 1;
        }
    }

        // compute (h * sinv) mod n
    component g_coeff = BigMultModP(n, k);
    for (var idx = 0; idx < k; idx++) {
        g_coeff.a[idx] <== sinv[idx];
        g_coeff.b[idx] <== msghash[idx];
        g_coeff.p[idx] <== order[idx];
    }

    // ! TODOS
    // compute (h * sinv) * G
    // component g_mult = ECDSAPrivToPub(n, k);
    // for (var idx = 0; idx < k; idx++) {
    //     g_mult.privkey[idx] <== g_coeff.out[idx];
    // }
    
    result <== 1;
}
pragma circom 2.1.8;

function get_A(n, k) {
    assert(n == 48 && k == 8);
    var ret[8];

    ret[0] = 4294967292;
    ret[1] = 0;
    ret[2] = 281470681743359;
    ret[3] = 281474976710655;
    ret[4] = 281474976710655;
    ret[5] = 281474976710655;
    ret[6] = 281474976710655;
    ret[7] = 281474976710655;   
    return ret;
}

function get_B(n, k) {
    assert(n == 48 && k == 8);
    var ret[8];

    ret[0] = 220923788274415;
    ret[1] = 151933689866885;
    ret[2] = 148823944345997;
    ret[3] = 3384577839123;
    ret[4] = 172000530219282;
    ret[5] = 250655048013853;
    ret[6] = 254968998004075;
    ret[7] = 197023834300990;    
    return ret;
}

function get_p384_prime(n, k) {
    assert(n == 48 && k == 8);
    var ret[8];

    ret[0] = 4294967295;
    ret[1] = 0;
    ret[2] = 281470681743359;
    ret[3] = 281474976710655;
    ret[4] = 281474976710655;
    ret[5] = 281474976710655;
    ret[6] = 281474976710655;
    ret[7] = 281474976710655;    
    return ret;
}

function get_p384_order(n, k) {
    assert(n == 48 && k == 8);
    var ret[8];

    ret[0] = 27946492701043;
    ret[1] = 79923561295084;
    ret[2] = 50437279059378;
    ret[3] = 219229316052023;
    ret[4] = 281474976710655;
    ret[5] = 281474976710655;
    ret[6] = 281474976710655;
    ret[7] = 281474976710655;    
    return ret;
}

function get_p384_params() {
    var A[8] = get_A(48, 8);
    var B[8] = get_B(48, 8);
    var P[8] = get_p384_prime(48, 8);
    var N[8] = get_p384_order(48, 8);

    return [A, B, P, N];
}

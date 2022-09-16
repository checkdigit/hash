// sha-1.ts

/* eslint-disable no-bitwise,no-magic-numbers,prefer-template,id-length */

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s: number, x: number, y: number, z: number) {
  switch (s) {
    case 0:
      return (x & y) ^ (~x & z);
    case 1:
      return x ^ y ^ z;
    case 2:
      return (x & y) ^ (x & z) ^ (y & z);
    case 3:
      return x ^ y ^ z;
    default:
      throw TypeError('s variable must be 0,1,2 or 3.');
  }
}

function ROTL(x: number, n: number) {
  return (x << n) | (x >>> (32 - n));
}

export default function sha1(bytes: string | Uint8Array): number[] {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0] as [number, number, number, number, number];

  let bytesToUse = [];

  if (typeof bytes === 'string') {
    const message = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytesToUse = [];

    for (let i = 0; i < message.length; ++i) {
      bytesToUse.push(message.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytesToUse = Array.prototype.slice.call(bytes);
  }

  bytesToUse.push(0x80);

  const l = bytesToUse.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M: undefined[] | Uint32Array[] = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] =
        (bytesToUse[i * 64 + j * 4] << 24) |
        (bytesToUse[i * 64 + j * 4 + 1] << 16) |
        (bytesToUse[i * 64 + j * 4 + 2] << 8) |
        bytesToUse[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  (M[N - 1] as Uint32Array)[14] = ((bytesToUse.length - 1) * 8) / 2 ** 32;
  (M[N - 1] as Uint32Array)[14] = Math.floor((M[N - 1] as Uint32Array)[14] as number);
  (M[N - 1] as Uint32Array)[15] = ((bytesToUse.length - 1) * 8) & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = (M[i] as Uint32Array)[t] as number;
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL((W[t - 3] as number) ^ (W[t - 8] as number) ^ (W[t - 14] as number) ^ (W[t - 16] as number), 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = (ROTL(a, 5) + f(s, b, c, d) + e + (K[s] as number) + (W[t] as number)) >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  return [
    (H[0] >> 24) & 0xff,
    (H[0] >> 16) & 0xff,
    (H[0] >> 8) & 0xff,
    H[0] & 0xff,
    (H[1] >> 24) & 0xff,
    (H[1] >> 16) & 0xff,
    (H[1] >> 8) & 0xff,
    H[1] & 0xff,
    (H[2] >> 24) & 0xff,
    (H[2] >> 16) & 0xff,
    (H[2] >> 8) & 0xff,
    H[2] & 0xff,
    (H[3] >> 24) & 0xff,
    (H[3] >> 16) & 0xff,
    (H[3] >> 8) & 0xff,
    H[3] & 0xff,
    (H[4] >> 24) & 0xff,
    (H[4] >> 16) & 0xff,
    (H[4] >> 8) & 0xff,
    H[4] & 0xff,
  ];
}

/* eslint-enable no-bitwise,no-magic-numbers,prefer-template,id-length */


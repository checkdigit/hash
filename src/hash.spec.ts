// hash.spec.ts

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import assert from 'assert';
import { validate } from 'uuid';

import hash from './hash';

describe('hash', () => {
  it('returns a uuid derived from hash of value', () => {
    const result1 = hash('string to be hashed into a uuid');
    const result2 = hash('string to be hashed into a uuid');
    assert.ok(validate(result1) && validate(result2));
    assert.strictEqual(result1, result2);
  });

  it('hash always returns the same value', () => {
    assert.strictEqual(hash('Hello World!'), '74caf525-c85a-5a3c-9d53-bef0507c21e4');
    assert.strictEqual(hash('d1253ec1-14bc-4c56-8e09-4450ab4c8a55'), '14abff19-2c5f-5408-af3d-3c6526ebea73');
    assert.strictEqual(hash('Råma Ghantå'), '8a28bfef-8fa2-52de-b9c5-1d5a6d7ba5fe');
    assert.strictEqual(
      // eslint-disable-next-line no-secrets/no-secrets
      hash('/hYSjdEGQI0DaVHCR0vZq0KeF5JLys3jSNvU9EzBMKKlSsC97xFd3wr+nrhzHhp1'),
      '7cb123ec-2c42-5a8a-b358-adf113ee088d'
    );
    // eslint-disable-next-line no-secrets/no-secrets
    assert.strictEqual(hash('nfv8yFRghIJV6ffFr2dJGi1978GPnUuc7JVi2/FPqHE='), 'e90938db-61fb-55b4-8ebe-4e1518e4fe97');
    // eslint-disable-next-line @checkdigit/no-card-numbers
    assert.strictEqual(hash('5111111111111118'), '87e25c4b-c395-585e-9ecf-43d190f6e62f');
    assert.strictEqual(hash('https://checkdigit.com'), '2c391f52-ec24-5945-8c28-88f74d12b55d');
  });
});

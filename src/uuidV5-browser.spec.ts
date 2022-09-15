// uuidV5-browser.spec.ts

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import assert from 'assert';
import { v5 } from 'uuid';

import { HASH_NAMESPACE } from './namespace';
import uuidV5 from './uuidV5-browser';

describe('uuidV5-browser', () => {
  it('uuidV5 result matches v5(https://github.com/uuidjs/uuid) result', async () => {
    assert.strictEqual(uuidV5('Hello World!', HASH_NAMESPACE), v5('Hello World!', HASH_NAMESPACE));
    assert.strictEqual(
      uuidV5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55', HASH_NAMESPACE),
      v5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55', HASH_NAMESPACE)
    );
    assert.strictEqual(
      uuidV5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55/abc/xyz', HASH_NAMESPACE),
      v5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55/abc/xyz', HASH_NAMESPACE)
    );
    assert.strictEqual(
      uuidV5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55-ABC', HASH_NAMESPACE),
      v5('d1253ec1-14bc-4c56-8e09-4450ab4c8a55-ABC', HASH_NAMESPACE)
    );
    assert.strictEqual(uuidV5('Råma Ghantå', HASH_NAMESPACE), v5('Råma Ghantå', HASH_NAMESPACE));
    assert.strictEqual(
      // eslint-disable-next-line no-secrets/no-secrets
      uuidV5('/hYSjdEGQI0DaVHCR0vZq0KeF5JLys3jSNvU9EzBMKKlSsC97xFd3wr+nrhzHhp1', HASH_NAMESPACE),
      // eslint-disable-next-line no-secrets/no-secrets
      v5('/hYSjdEGQI0DaVHCR0vZq0KeF5JLys3jSNvU9EzBMKKlSsC97xFd3wr+nrhzHhp1', HASH_NAMESPACE)
    );
    assert.strictEqual(
      // eslint-disable-next-line no-secrets/no-secrets
      uuidV5('nfv8yFRghIJV6ffFr2dJGi1978GPnUuc7JVi2/FPqHE=', HASH_NAMESPACE),
      // eslint-disable-next-line no-secrets/no-secrets
      v5('nfv8yFRghIJV6ffFr2dJGi1978GPnUuc7JVi2/FPqHE=', HASH_NAMESPACE)
    );
    // eslint-disable-next-line @checkdigit/no-card-numbers
    assert.strictEqual(uuidV5('5111111111111118', HASH_NAMESPACE), v5('5111111111111118', HASH_NAMESPACE));
    assert.strictEqual(uuidV5('https://checkdigit.com', HASH_NAMESPACE), v5('https://checkdigit.com', HASH_NAMESPACE));
  });
});

describe('same V5 tests as in https://github.com/uuidjs/uuid', () => {
  it('v5', () => {
    assert.strictEqual(uuidV5('hello.example.com', v5.DNS), 'fdda765f-fc57-5604-a269-52a7df8164ec');

    assert.strictEqual(uuidV5('http://example.com/hello', v5.URL), '3bbcee75-cecc-5b56-8031-b6641c1ed1f1');

    assert.strictEqual(uuidV5('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'), '90123e1c-7512-523e-bb28-76fab9f2f73d');
  });

  it('v5 namespace.toUpperCase', () => {
    assert.strictEqual(uuidV5('hello.example.com', v5.DNS.toUpperCase()), 'fdda765f-fc57-5604-a269-52a7df8164ec');

    assert.strictEqual(
      uuidV5('http://example.com/hello', v5.URL.toUpperCase()),
      '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'
    );

    assert.strictEqual(
      uuidV5('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'.toUpperCase()),
      '90123e1c-7512-523e-bb28-76fab9f2f73d'
    );
  });
});

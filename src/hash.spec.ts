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
  it('hash() returns a uuid derived from hash of value', () => {
    const result1 = hash('string to be hashed into a uuid');
    const result2 = hash('string to be hashed into a uuid');

    assert.ok(validate(result1));
    assert.ok(validate(result2));

    assert.strictEqual(result1, result2);
  });
});

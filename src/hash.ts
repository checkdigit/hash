// hash.ts

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import { createHash } from 'crypto';

import { HASH_NAMESPACE } from './namespace';
import uuidV5 from './uuid-v5';

export { HASH_NAMESPACE };

/**
 * @param value - a string to be hashed and converted into a derived uuid
 */

export default function (value: string): string {
  return uuidV5(createHash('sha512').update(value).digest('base64'), HASH_NAMESPACE);
}

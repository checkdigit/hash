// uuid-v5.ts
/* eslint-disable no-bitwise,no-magic-numbers,prefer-template */

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is derived from https://github.com/uuidjs/uuid,
 * licensed under the MIT license (see below for details).
 *
 * Copyright (c) 2010-2020 Robert Kieffer and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { createHash } from 'crypto';

import { default as parse } from './parse';

export default function (value: string, namespace: string): string {
  const buffer = createHash('sha1').update(parse(namespace)).update(value).digest();
  buffer[6] = ((buffer[6] as number) & 0x0f) | 0x50;
  buffer[8] = ((buffer[8] as number) & 0x3f) | 0x80;
  const hex = buffer.toString('hex', 0, 16);
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32),
  ]
    .join('-')
    .toLowerCase();
}
/* eslint-enable no-bitwise,no-magic-numbers,prefer-template */

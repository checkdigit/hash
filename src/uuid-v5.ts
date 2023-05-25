// uuid-v5.ts

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

import { createHash } from 'node:crypto';

/* eslint-disable no-bitwise,no-magic-numbers */
function parse(namespace: string) {
  let value;
  const intArray = new Uint8Array(16);

  // Parse ########-....-....-....-............
  intArray[0] = (value = Number.parseInt(namespace.slice(0, 8), 16)) >>> 24;
  intArray[1] = (value >>> 16) & 0xff;
  intArray[2] = (value >>> 8) & 0xff;
  intArray[3] = value & 0xff;

  // Parse ........-####-....-....-............
  intArray[4] = (value = Number.parseInt(namespace.slice(9, 13), 16)) >>> 8;
  intArray[5] = value & 0xff;

  // Parse ........-....-####-....-............
  intArray[6] = (value = Number.parseInt(namespace.slice(14, 18), 16)) >>> 8;
  intArray[7] = value & 0xff;

  // Parse ........-....-....-####-............
  intArray[8] = (value = Number.parseInt(namespace.slice(19, 23), 16)) >>> 8;
  intArray[9] = value & 0xff;

  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  intArray[10] = ((value = Number.parseInt(namespace.slice(24, 36), 16)) / 0x1_00_00_00_00_00) & 0xff;
  intArray[11] = (value / 0x1_00_00_00_00) & 0xff;
  intArray[12] = (value >>> 24) & 0xff;
  intArray[13] = (value >>> 16) & 0xff;
  intArray[14] = (value >>> 8) & 0xff;
  intArray[15] = value & 0xff;

  return intArray;
}

export default function (value: string, namespace: string): string {
  const buffer = createHash('sha1').update(parse(namespace)).update(value).digest();
  // note that undefined is treated as 0 by the & operator
  buffer[6] = ((buffer[6] ?? 0) & 0x0f) | 0x50;
  buffer[8] = ((buffer[8] ?? 0) & 0x3f) | 0x80;
  const hex = buffer.toString('hex', 0, 16);
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20, 32)]
    .join('-')
    .toLowerCase();
}
/* eslint-enable no-bitwise,no-magic-numbers */

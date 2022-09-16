// stringify.ts

import validateUuid from './validate-uuid';

/* eslint-disable no-magic-numbers,prefer-template */

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex: string[] = [];

for (let index = 0; index < 256; ++index) {
  byteToHex.push((index + 0x100).toString(16).slice(1));
}

export function unsafeStringify(array: number[], offset = 0): string {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (byteToHex[array[offset + 0] as number] as string) +
    byteToHex[array[offset + 1] as number] +
    byteToHex[array[offset + 2] as number] +
    byteToHex[array[offset + 3] as number] +
    '-' +
    byteToHex[array[offset + 4] as number] +
    byteToHex[array[offset + 5] as number] +
    '-' +
    byteToHex[array[offset + 6] as number] +
    byteToHex[array[offset + 7] as number] +
    '-' +
    byteToHex[array[offset + 8] as number] +
    byteToHex[array[offset + 9] as number] +
    '-' +
    byteToHex[array[offset + 10] as number] +
    byteToHex[array[offset + 11] as number] +
    byteToHex[array[offset + 12] as number] +
    byteToHex[array[offset + 13] as number] +
    byteToHex[array[offset + 14] as number] +
    byteToHex[array[offset + 15] as number]
  ).toLowerCase();
}

export default function stringify(array: number[], offset = 0): string {
  const uuid = unsafeStringify(array, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!validateUuid(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* eslint-enable no-magic-numbers,prefer-template */

// parse.ts

/* eslint-disable no-bitwise,no-magic-numbers,prefer-template */
export default function parse(namespace: string): Uint8Array {
  let value;
  const intArray = new Uint8Array(16);

  // Parse ########-....-....-....-............
  intArray[0] = (value = parseInt(namespace.slice(0, 8), 16)) >>> 24;
  intArray[1] = (value >>> 16) & 0xff;
  intArray[2] = (value >>> 8) & 0xff;
  intArray[3] = value & 0xff;

  // Parse ........-####-....-....-............
  intArray[4] = (value = parseInt(namespace.slice(9, 13), 16)) >>> 8;
  intArray[5] = value & 0xff;

  // Parse ........-....-####-....-............
  intArray[6] = (value = parseInt(namespace.slice(14, 18), 16)) >>> 8;
  intArray[7] = value & 0xff;

  // Parse ........-....-....-####-............
  intArray[8] = (value = parseInt(namespace.slice(19, 23), 16)) >>> 8;
  intArray[9] = value & 0xff;

  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  intArray[10] = ((value = parseInt(namespace.slice(24, 36), 16)) / 0x10000000000) & 0xff;
  intArray[11] = (value / 0x100000000) & 0xff;
  intArray[12] = (value >>> 24) & 0xff;
  intArray[13] = (value >>> 16) & 0xff;
  intArray[14] = (value >>> 8) & 0xff;
  intArray[15] = value & 0xff;

  return intArray;
}
/* eslint-enable no-bitwise,no-magic-numbers,prefer-template */
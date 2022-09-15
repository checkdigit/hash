// v5.ts

import { default as parse } from './parse';
import { default as sha1 } from './sha-1';
import { unsafeStringify } from './stringify';

function stringToBytes(value: string): number[] {
  const encodedValue = unescape(encodeURIComponent(value)); // UTF8 escape

  const bytes = [];

  for (let index = 0; index < encodedValue.length; ++index) {
    bytes.push(encodedValue.charCodeAt(index));
  }

  return bytes;
}

export default function v5(value: string, namespace: string): string {
  const valueBytes = stringToBytes(value);

  const parsedNamespace = parse(namespace);

  if (parsedNamespace?.length !== 16) {
    throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
  }

  const bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(parsedNamespace);
  bytes.set(valueBytes, parsedNamespace.length);

  const sha1Bytes = sha1(bytes);

  // eslint-disable-next-line no-bitwise,no-magic-numbers
  sha1Bytes[6] = ((sha1Bytes[6] as number) & 0x0f) | 0x50;
  // eslint-disable-next-line no-bitwise,no-magic-numbers
  sha1Bytes[8] = ((sha1Bytes[8] as number) & 0x3f) | 0x80;

  return unsafeStringify(sha1Bytes);
}

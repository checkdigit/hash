// hash-browser.ts

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import { HASH_NAMESPACE } from './namespace';
import uuidV5 from './uuidV5-browser';

export { HASH_NAMESPACE };

/**
 * @param value - a string to be hashed and converted into a derived uuid
 */

async function convertArrayBufferToBase64(data: ArrayBuffer): Promise<string> {
  // Use a FileReader to generate a base64 data URI
  const base64url: string | ArrayBuffer | null = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });

  /*
  The result looks like
  "data:application/octet-stream;base64,<your base64 data>",
  so we split off the beginning:
  */
  return (base64url as string).split(',', 2)[1] as string;
}

export default async function (value: string): Promise<string> {
  const arrayBuffer = await window.crypto.subtle.digest('SHA-512', new TextEncoder().encode(value));
  const base64Result = await convertArrayBufferToBase64(arrayBuffer);
  return uuidV5(base64Result, HASH_NAMESPACE);
}

// hash.ts

import { createHash } from 'crypto';
import { v5 as uuidV5 } from 'uuid';

const HASH_NAMESPACE = 'f25d4515-fea7-44c7-8baf-f3ca50865e66';

/**
 * @param value - a string to be hashed and converted into a derived uuid
 */

export default function (value: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (uuidV5(createHash('sha512').update(value).digest('base64'), HASH_NAMESPACE) as unknown) as string;
}

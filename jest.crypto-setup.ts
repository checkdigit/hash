import crypto from 'crypto';
import {TextEncoder} from 'util';

Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: crypto.webcrypto.subtle,
  },
});

global.TextEncoder = TextEncoder;

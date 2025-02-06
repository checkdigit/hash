# Hash

Copyright © 2021-2025 [Check Digit, LLC](https://checkdigit.com)

Hash is a small function for Check Digit services to create a UUID derived from a hash generated from a given value.

## Install

```shell
$ npm install @checkdigit/hash
```

## Use

```ts
import { hash } from '@checkdigit/hash';

const derivedUUID = hash('some value');
```

## License

MIT

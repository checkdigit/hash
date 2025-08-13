# Hash Library

Hash is a small TypeScript utility library for Check Digit services that creates UUIDs derived from hashes generated from given values. The library uses Node.js experimental features and requires specific setup.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Critical Requirements

**REQUIRED NODE.JS VERSION**: This project requires Node.js 22.11 or higher for the `--experimental-strip-types` feature. The CI pipeline runs on Node.js 22.x and 23.x.

## Working Effectively

### Bootstrap and Setup

- **Install Node.js 22.12.0 or later**:
  ```bash
  curl -fsSL https://nodejs.org/dist/v22.12.0/node-v22.12.0-linux-x64.tar.xz -o node.tar.xz
  tar -xJf node.tar.xz
  export PATH=$PWD/node-v22.12.0-linux-x64/bin:$PATH
  node --version  # Should show v22.12.0 or higher
  ```
- **Install Node.js 22.12.0 or later**:

  > **Note:** The following instructions are for Linux x64. For other platforms (Windows, macOS, ARM), please refer to the [official Node.js installation guide](https://nodejs.org/en/download/) for platform-specific instructions.

  **Linux x64 example:**

  ```bash
  curl -fsSL https://nodejs.org/dist/v22.12.0/node-v22.12.0-linux-x64.tar.xz -o node.tar.xz
  tar -xJf node.tar.xz
  export PATH=$PWD/node-v22.12.0-linux-x64/bin:$PATH
  node --version  # Should show v22.12.0 or higher
  ```

- **Install dependencies**:
  ```bash
  npm ci --ignore-scripts
  ```
  Takes ~7 seconds. Clean install without running scripts for security.

### Build and Test Commands

- **Type check compilation**:

  ```bash
  npm run ci:compile
  ```

  Takes ~3 seconds. Runs `tsc --noEmit` for type checking only.

- **Run tests**:

  ```bash
  npm run ci:test
  ```

  Takes <1 second. Runs 5 tests using Node.js built-in test runner with experimental TypeScript support.

- **Run tests with coverage**:

  ```bash
  npm run coverage
  ```

  Takes <1 second. NEVER CANCEL - Set timeout to 60+ seconds just in case.

- **Lint source code**:

  ```bash
  npm run ci:lint
  ```

  Takes ~4-6 seconds. IMPORTANT: Ensure no extra files are in repo root (like downloaded Node.js) as ESLint scans everything.

- **Check code style**:

  ```bash
  npm run ci:style
  ```

  Takes ~7 seconds. Runs prettier to check formatting.

- **Build distribution packages**:

  ```bash
  npm run prepublishOnly
  ```

  Takes ~4 seconds. NEVER CANCEL - Set timeout to 120+ seconds. Creates `dist-types/` and `dist-mjs/` directories.

- **Run all CI checks**:
  ```bash
  npm test
  ```
  Takes ~15 seconds total. NEVER CANCEL - Set timeout to 180+ seconds. Runs compile + test + lint + style checks.

## Validation Scenarios

### Manual Testing

Always test the hash function after making changes:

```bash
node --experimental-strip-types -e "
import hash from './src/hash.ts';
const result1 = hash('test string');
const result2 = hash('test string');
const result3 = hash('different string');
console.log('Consistent results:', result1 === result2);
console.log('Different inputs differ:', result1 !== result3);
console.log('Result format:', result1);
"
```

### Built Distribution Testing

Always verify the built distribution works:

```bash
npm run prepublishOnly
node -e "
import hash from './dist-mjs/index.mjs';
console.log('Built dist result:', hash('test'));
"
```

### Pre-commit Validation

Always run these commands before committing changes or the CI will fail:

1. `npm run ci:compile` - Type checking
2. `npm run ci:test` - Unit tests
3. `npm run ci:lint` - Linting (ensure clean repo directory)
4. `npm run ci:style` - Code formatting

## Key Architecture

### Source Structure

```text
src/
├── index.ts          # Main export file
├── hash.ts           # Core hash function implementation
├── hash.spec.ts      # Hash function tests
├── uuid-v5.ts        # UUID v5 implementation
└── uuid-v5.spec.ts   # UUID v5 tests
```

### Core Functionality

- `hash(value: string): string` - Generates UUID from SHA-512 hash of input
- Uses custom UUID v5 implementation with namespace `f25d4515-fea7-44c7-8baf-f3ca50865e66`
- Produces consistent, deterministic UUIDs for identical inputs

### Build Outputs

- `dist-types/` - TypeScript declaration files (.d.ts)
- `dist-mjs/` - ES modules (.mjs) with source maps

## Common Issues and Solutions

### Node.js Version Errors

If you see "bad option: --experimental-strip-types":

- Verify Node.js version: `node --version` (must be 22.11+)
- Re-export PATH to Node.js 22+ installation

### Linting Failures

If ESLint reports many errors in unexpected files:

- Clean repo directory of any temporary files
- ESLint scans entire repo, not just source code

### Build Artifacts

Build creates `dist-types/` and `dist-mjs/` directories. These are included in the published package but should not be committed to git; ensure these directories are listed in `.gitignore` so they are properly excluded.

## Timing Expectations

All commands are fast (< 15 seconds total):

- Dependencies: ~7 seconds
- Type check: ~3 seconds
- Tests: <1 second
- Linting: ~4-6 seconds
- Style check: ~7 seconds
- Build: ~4 seconds
- Full test suite: ~15 seconds

NEVER CANCEL any command. Set timeouts generously:

- Individual commands: 60+ seconds
- Full test suite: 180+ seconds
- Build commands: 120+ seconds

## Repository Structure Reference

### Root Files

```text
├── .github/
│   └── workflows/          # CI/CD pipelines
├── src/                    # TypeScript source code
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
├── README.md              # Basic usage documentation
├── SECURITY.md            # Security policies
└── LICENSE.txt            # MIT license
```

### Package.json Scripts Reference

```json
{
  "ci:compile": "tsc --noEmit",
  "ci:test": "node --experimental-strip-types --test src/**/*.spec.ts",
  "ci:lint": "eslint --max-warnings 0 .",
  "ci:style": "prettier --list-different .",
  "test": "npm run ci:compile && npm run ci:test && npm run ci:lint && npm run ci:style",
  "coverage": "node --experimental-test-coverage --test src/**/*.spec.ts",
  "prepublishOnly": "npm run build:dist-types && npm run build:dist-mjs"
}
```

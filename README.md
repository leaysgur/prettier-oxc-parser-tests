# prettier-plugin-oxc

> [!WARNING]
> - This is experimental plugin using experimental feature!

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

This plugin aims to be drop in replacement for:

- JS(X): `babel` parser
- TS(X): `typescript` parser

## Usage

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

## TODO

- Postprocess AST
  - JS: Remove useless extra parens
  - JS/TS: rebalance logical exprs, etc...
- Wait or improve TS-ESLint alignment
  - https://github.com/oxc-project/oxc/issues/9705
  - Then verify diffs
- Support `SourceLocation`(`loc.start/end`)?
  - This is needed for both normal nodes and comments
  - This is unnecessary if using Prettier@main, but not yet released
  - OXC also plans to implement this, but not yet started
    - https://github.com/oxc-project/oxc/issues/10307
- Support deprecated TS-ESTree AST nodes?
  - Prettier still depends on deprecated fields w/ `suppressDeprecatedPropertyWarnings`
    - `TSEnumDeclaration.members`
    - `TSMappedType.typeParameter`
  - Current bench failings (other than `reading 'start'`) are because of this

## Debug

```sh
node debug.js

./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc debug.js
./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc ./benchmark/fixtures/0028-kb.js
```

## Coverage

```sh
# Clone prettier repo next to this repo, then
node coverage/run.js
```

- OXC version: `0.68.1`
- Prettier version: `3.5.3`

```
┌─────────┬──────────────┬──────────────┬────────────┬─────────┬─────────┬───────────┐
│ (index) │ theirsFailed │ testerFailed │ oursFailed │ matched │ created │ coverage  │
├─────────┼──────────────┼──────────────┼────────────┼─────────┼─────────┼───────────┤
│ js      │ 86           │ 155          │ 7          │ 547     │ 113     │ '82.88%'  │
│ jsx     │ 7            │ 3            │ 0          │ 30      │ 22      │ '57.69%'  │
│ ts      │ 19           │ 0            │ 56         │ 451     │ 14      │ '96.99%'  │
│ tsx     │ 9            │ 0            │ 0          │ 53      │ 0       │ '100.00%' │
└─────────┴──────────────┴──────────────┴────────────┴─────────┴─────────┴───────────┘
```

## Benchmark

```sh
node --expose-gc benchmark/run.js
```

- OXC version: `0.68.1`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.69 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `109.63 µs/iter` | ` 84.96 µs` | `100.63 µs` | `604.50 µs` | `  1.93 ms` |
| babel | `104.50 µs/iter` | ` 87.79 µs` | ` 99.83 µs` | `482.83 µs` | `  1.53 ms` |

#### 0001-kb.js
clk: ~3.60 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `643.61 µs/iter` | `536.75 µs` | `645.00 µs` | `  1.44 ms` | `  2.51 ms` |
| babel | `780.05 µs/iter` | `630.33 µs` | `803.21 µs` | `  1.55 ms` | `  2.60 ms` |

#### 0003-kb.jsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.20 ms/iter` | `  1.02 ms` | `  1.26 ms` | `  2.38 ms` | `  4.01 ms` |
| babel | `  1.57 ms/iter` | `  1.28 ms` | `  1.71 ms` | `  2.81 ms` | `  3.80 ms` |

#### 0005-kb.js
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.14 ms/iter` | `982.21 µs` | `  1.16 ms` | `  2.23 ms` | `  2.88 ms` |
| babel | `  1.54 ms/iter` | `  1.27 ms` | `  1.61 ms` | `  2.64 ms` | `  3.78 ms` |

#### 0006-kb.jsx
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.79 ms/iter` | `  1.50 ms` | `  1.85 ms` | `  4.36 ms` | `  5.15 ms` |
| babel | `  2.20 ms/iter` | `  1.78 ms` | `  2.39 ms` | `  3.95 ms` | `  4.33 ms` |

#### 0010-kb.js
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.58 ms/iter` | `  2.22 ms` | `  2.66 ms` | `  4.45 ms` | `  5.49 ms` |
| babel | `  3.43 ms/iter` | `  2.77 ms` | `  3.64 ms` | `  6.17 ms` | `  6.74 ms` |

#### 0028-kb.js
clk: ~1.85 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.62 ms/iter` | `  6.55 ms` | `  7.96 ms` | ` 10.54 ms` | ` 10.93 ms` |
| babel | `  9.50 ms/iter` | `  8.31 ms` | `  9.65 ms` | ` 12.91 ms` | ` 13.21 ms` |

#### 0080-kb.mjs
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.89 ms/iter` | ` 48.90 ms` | ` 54.41 ms` | ` 55.17 ms` | ` 57.17 ms` |
| babel | ` 78.15 ms/iter` | ` 64.34 ms` | ` 80.61 ms` | ` 89.66 ms` | `127.18 ms` |

#### 0143-kb.js
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 46.83 ms/iter` | ` 42.52 ms` | ` 47.40 ms` | ` 49.70 ms` | ` 59.67 ms` |
| babel | ` 69.22 ms/iter` | ` 59.65 ms` | ` 67.08 ms` | ` 83.29 ms` | `107.63 ms` |

#### 0554-kb.js
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `190.09 ms/iter` | `175.84 ms` | `190.27 ms` | `191.23 ms` | `260.17 ms` |
| babel | `358.18 ms/iter` | `323.59 ms` | `356.18 ms` | `423.12 ms` | `459.41 ms` |


### TS(X)
#### 0000-kb.ts
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | `502.28 µs/iter` | `380.46 µs` | `480.58 µs` | `  1.50 ms` | `  3.37 ms` |

#### 0001-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `466.46 µs/iter` | `377.21 µs` | `464.08 µs` | `  1.07 ms` | `  2.69 ms` |
| typescript | `888.53 µs/iter` | `700.33 µs` | `894.33 µs` | `  2.21 ms` | `  3.65 ms` |

#### 0003-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `810.00 µs/iter` | `707.25 µs` | `795.21 µs` | `  1.59 ms` | `  2.30 ms` |
| typescript | `  1.53 ms/iter` | `  1.24 ms` | `  1.61 ms` | `  3.14 ms` | `  4.32 ms` |

#### 0007-kb.ts
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Unexpected token. Did you mean `{'>'}` or `&gt;`? |
| typescript | `  5.38 ms/iter` | `  4.40 ms` | `  5.62 ms` | `  8.73 ms` | `  9.57 ms` |

#### 0008-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  2.99 ms/iter` | `  2.53 ms` | `  3.12 ms` | `  5.29 ms` | `  6.19 ms` |
| typescript | `  5.77 ms/iter` | `  4.63 ms` | `  6.07 ms` | `  9.07 ms` | ` 11.56 ms` |

#### 0015-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.16 ms/iter` | `  3.53 ms` | `  4.32 ms` | `  6.91 ms` | `  8.04 ms` |
| typescript | `  7.16 ms/iter` | `  6.07 ms` | `  7.45 ms` | ` 10.47 ms` | ` 12.20 ms` |

#### 0021-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.31 ms/iter` | `  3.66 ms` | `  4.39 ms` | `  6.56 ms` | `  8.87 ms` |
| typescript | `  8.89 ms/iter` | `  7.15 ms` | `  9.62 ms` | ` 14.00 ms` | ` 14.10 ms` |

#### 0022-kb.tsx
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'start') |
| typescript | ` 13.43 ms/iter` | ` 11.38 ms` | ` 14.15 ms` | ` 17.67 ms` | ` 17.94 ms` |

#### 0040-kb.ts
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'range') |
| typescript | ` 33.99 ms/iter` | ` 29.68 ms` | ` 35.50 ms` | ` 41.00 ms` | ` 44.75 ms` |

#### 0050-kb.ts
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | ` 27.89 ms/iter` | ` 23.53 ms` | ` 30.55 ms` | ` 34.12 ms` | ` 40.51 ms` |

#### 2922-kb.ts
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | `   1.25 s/iter` | `   1.17 s` | `   1.29 s` | `   1.35 s` | `   1.36 s` |



# prettier-plugin-oxc

> [!WARNING]
> - This is experimental plugin using experimental feature!

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

This plugin aims to be drop in replacement for:

- JS(X): `babel` parser
- TS(X): `typescript` parser

## TODO

- Postprocess AST
  - JS: Remove useless extra parens
  - JS/TS: rebalance logical exprs, etc...
- Wait or improve TS-ESLint alignment
  - https://github.com/oxc-project/oxc/issues/9705
  - Then verify diffs
- Support `SourceLocation`(`loc.start/end`)?
  - This is not necessary if using Prettier@main, but not yet released
  - OXC also plans to implement this, but not yet started
    - https://github.com/oxc-project/oxc/issues/10307
  - This is needed for both normal nodes and comments
    - Current `3930-kb.js` bench failing is due to luck of this for `BreakStatement`

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
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `101.33 µs/iter` | ` 77.54 µs` | ` 97.25 µs` | `520.42 µs` | `  1.53 ms` |
| babel | `102.08 µs/iter` | ` 81.13 µs` | ` 97.33 µs` | `483.21 µs` | `  1.55 ms` |

#### 0001-kb.js
clk: ~3.79 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `640.78 µs/iter` | `530.88 µs` | `637.21 µs` | `  1.42 ms` | `  2.41 ms` |
| babel | `762.37 µs/iter` | `623.38 µs` | `789.67 µs` | `  1.48 ms` | `  2.45 ms` |

#### 0003-kb.jsx
clk: ~2.00 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.19 ms/iter` | `  1.02 ms` | `  1.24 ms` | `  2.17 ms` | `  3.34 ms` |
| babel | `  1.49 ms/iter` | `  1.24 ms` | `  1.61 ms` | `  2.50 ms` | `  3.27 ms` |

#### 0005-kb.js
clk: ~3.56 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.13 ms/iter` | `973.58 µs` | `  1.15 ms` | `  2.21 ms` | `  3.06 ms` |
| babel | `  1.53 ms/iter` | `  1.26 ms` | `  1.59 ms` | `  3.18 ms` | `  3.67 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.71 ms/iter` | `  1.46 ms` | `  1.81 ms` | `  3.14 ms` | `  4.08 ms` |
| babel | `  2.10 ms/iter` | `  1.75 ms` | `  2.29 ms` | `  3.47 ms` | `  4.21 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.53 ms/iter` | `  2.19 ms` | `  2.62 ms` | `  4.42 ms` | `  5.46 ms` |
| babel | `  3.27 ms/iter` | `  2.74 ms` | `  3.49 ms` | `  5.15 ms` | `  5.45 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.34 ms/iter` | `  6.44 ms` | `  7.45 ms` | `  9.80 ms` | ` 10.89 ms` |
| babel | `  9.27 ms/iter` | `  8.22 ms` | `  9.26 ms` | ` 13.26 ms` | ` 13.51 ms` |

#### 0080-kb.mjs
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.36 ms/iter` | ` 48.41 ms` | ` 51.55 ms` | ` 55.20 ms` | ` 58.86 ms` |
| babel | ` 73.72 ms/iter` | ` 63.42 ms` | ` 75.84 ms` | ` 91.64 ms` | `119.57 ms` |

#### 0143-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 46.71 ms/iter` | ` 43.13 ms` | ` 47.87 ms` | ` 50.31 ms` | ` 58.86 ms` |
| babel | ` 67.08 ms/iter` | ` 55.86 ms` | ` 63.80 ms` | ` 85.75 ms` | `105.15 ms` |

#### 0554-kb.js
clk: ~3.59 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `187.73 ms/iter` | `174.87 ms` | `183.88 ms` | `189.35 ms` | `250.82 ms` |
| babel | `348.92 ms/iter` | `318.73 ms` | `352.62 ms` | `376.93 ms` | `464.34 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.58 s/iter` | `   3.47 s` | `   3.60 s` | `   3.70 s` | `   3.87 s` |


### TS(X)
#### 0000-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `243.74 µs/iter` | `204.75 µs` | `233.58 µs` | `665.79 µs` | `  1.89 ms` |
| typescript | `453.95 µs/iter` | `351.04 µs` | `426.29 µs` | `  1.45 ms` | `  2.93 ms` |

#### 0000-kb.tsx
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `184.49 µs/iter` | `152.17 µs` | `179.33 µs` | `614.88 µs` | `  2.17 ms` |
| typescript | `333.43 µs/iter` | `247.88 µs` | `325.92 µs` | `  1.27 ms` | `  2.61 ms` |

#### 0002-kb.ts
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `878.14 µs/iter` | `754.79 µs` | `868.88 µs` | `  1.92 ms` | `  3.08 ms` |
| typescript | `  1.75 ms/iter` | `  1.33 ms` | `  1.90 ms` | `  4.31 ms` | `  4.80 ms` |

#### 0003-kb.tsx
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  1.13 ms/iter` | `991.67 µs` | `  1.14 ms` | `  2.07 ms` | `  3.54 ms` |
| typescript | `  2.32 ms/iter` | `  1.85 ms` | `  2.56 ms` | `  4.95 ms` | `  5.18 ms` |

#### 0004-kb.ts
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  1.44 ms/iter` | `  1.27 ms` | `  1.50 ms` | `  2.32 ms` | `  3.44 ms` |
| typescript | `  3.82 ms/iter` | `  2.94 ms` | `  4.09 ms` | `  7.04 ms` | `  7.24 ms` |

#### 0007-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Unexpected token. Did you mean `{'>'}` or `&gt;`? |
| typescript | `  5.44 ms/iter` | `  4.36 ms` | `  5.77 ms` | `  9.57 ms` | ` 10.21 ms` |

#### 0008-kb.tsx
clk: ~3.51 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  2.95 ms/iter` | `  2.49 ms` | `  3.06 ms` | `  5.30 ms` | `  6.10 ms` |
| typescript | `  5.76 ms/iter` | `  4.51 ms` | `  6.30 ms` | `  9.22 ms` | `  9.46 ms` |

#### 0012-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'range') |
| typescript | `  8.70 ms/iter` | `  7.14 ms` | `  9.21 ms` | ` 13.36 ms` | ` 14.39 ms` |

#### 0023-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  7.29 ms/iter` | `  6.29 ms` | `  7.40 ms` | ` 11.58 ms` | ` 12.27 ms` |
| typescript | ` 19.39 ms/iter` | ` 16.13 ms` | ` 21.61 ms` | ` 23.73 ms` | ` 27.88 ms` |

#### 0040-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'range') |
| typescript | ` 34.54 ms/iter` | ` 28.77 ms` | ` 36.22 ms` | ` 45.72 ms` | ` 48.64 ms` |

#### 1056-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'start') |
| typescript | `566.98 ms/iter` | `525.81 ms` | `571.64 ms` | `590.43 ms` | `708.85 ms` |

#### 2922-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | `   1.22 s/iter` | `   1.17 s` | `   1.22 s` | `   1.30 s` | `   1.30 s` |



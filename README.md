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

- Add benchmark for TS(X)
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
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `104.52 µs/iter` | ` 78.58 µs` | ` 98.13 µs` | `527.42 µs` | `  1.70 ms` |
| babel | `101.39 µs/iter` | ` 81.63 µs` | ` 97.96 µs` | `481.29 µs` | `  1.44 ms` |

#### 0001-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `634.66 µs/iter` | `507.42 µs` | `637.88 µs` | `  1.39 ms` | `  2.45 ms` |
| babel | `766.60 µs/iter` | `600.54 µs` | `788.50 µs` | `  1.46 ms` | `  2.40 ms` |

#### 0003-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.18 ms/iter` | `  1.03 ms` | `  1.21 ms` | `  2.29 ms` | `  3.04 ms` |
| babel | `  1.77 ms/iter` | `  1.30 ms` | `  1.81 ms` | `  5.26 ms` | `  6.74 ms` |

#### 0005-kb.js
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.12 ms/iter` | `972.92 µs` | `  1.13 ms` | `  1.94 ms` | `  2.92 ms` |
| babel | `  1.52 ms/iter` | `  1.28 ms` | `  1.63 ms` | `  2.73 ms` | `  3.46 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.71 ms/iter` | `  1.47 ms` | `  1.79 ms` | `  3.23 ms` | `  4.78 ms` |
| babel | `  2.24 ms/iter` | `  1.80 ms` | `  2.44 ms` | `  4.13 ms` | `  4.58 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.54 ms/iter` | `  2.21 ms` | `  2.64 ms` | `  4.37 ms` | `  5.09 ms` |
| babel | `  3.36 ms/iter` | `  2.73 ms` | `  3.52 ms` | `  6.86 ms` | `  7.15 ms` |

#### 0028-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.49 ms/iter` | `  6.55 ms` | `  7.72 ms` | `  9.76 ms` | ` 10.09 ms` |
| babel | `  9.60 ms/iter` | `  8.52 ms` | `  9.97 ms` | ` 12.44 ms` | ` 12.70 ms` |

#### 0080-kb.mjs
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.03 ms/iter` | ` 48.28 ms` | ` 53.04 ms` | ` 53.97 ms` | ` 56.42 ms` |
| babel | ` 77.04 ms/iter` | ` 64.49 ms` | ` 74.67 ms` | ` 90.58 ms` | `124.05 ms` |

#### 0143-kb.js
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 45.67 ms/iter` | ` 42.36 ms` | ` 46.43 ms` | ` 50.47 ms` | ` 55.20 ms` |
| babel | ` 66.11 ms/iter` | ` 56.78 ms` | ` 63.53 ms` | ` 87.18 ms` | `103.47 ms` |

#### 0554-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `187.85 ms/iter` | `175.08 ms` | `184.83 ms` | `192.61 ms` | `252.55 ms` |
| babel | `353.55 ms/iter` | `313.53 ms` | `354.15 ms` | `405.28 ms` | `490.08 ms` |

#### 3930-kb.js
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.52 s/iter` | `   3.34 s` | `   3.56 s` | `   3.64 s` | `   3.74 s` |


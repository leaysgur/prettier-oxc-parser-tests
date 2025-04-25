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
- Support `SourceLocation`(`loc.start/end`)
  - This can be done if using Prettier@main, but not yet released
  - Need to support both normal nodes and comments

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

```
┌─────────┬──────────────┬──────────────┬────────────┬─────────┬─────────┬───────────┐
│ (index) │ theirsFailed │ testerFailed │ oursFailed │ matched │ created │ coverage  │
├─────────┼──────────────┼──────────────┼────────────┼─────────┼─────────┼───────────┤
│ js      │ 86           │ 155          │ 7          │ 543     │ 115     │ '82.52%'  │
│ jsx     │ 7            │ 3            │ 0          │ 30      │ 22      │ '57.69%'  │
│ ts      │ 19           │ 0            │ 56         │ 457     │ 8       │ '98.28%'  │
│ tsx     │ 9            │ 0            │ 0          │ 53      │ 0       │ '100.00%' │
└─────────┴──────────────┴──────────────┴────────────┴─────────┴─────────┴───────────┘
```

## Benchmark

```sh
node --expose-gc benchmark/run.js
```

- OXC version: `0.66.0`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `106.47 µs/iter` | ` 78.75 µs` | ` 98.46 µs` | `525.67 µs` | `  2.30 ms` |
| babel | `102.69 µs/iter` | ` 81.25 µs` | ` 97.92 µs` | `494.58 µs` | `  1.56 ms` |

#### 0001-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `636.01 µs/iter` | `522.67 µs` | `633.21 µs` | `  1.43 ms` | `  2.44 ms` |
| babel | `774.02 µs/iter` | `626.71 µs` | `805.50 µs` | `  1.48 ms` | `  2.47 ms` |

#### 0003-kb.jsx
clk: ~3.76 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.19 ms/iter` | `  1.03 ms` | `  1.24 ms` | `  2.30 ms` | `  2.91 ms` |
| babel | `  1.54 ms/iter` | `  1.27 ms` | `  1.69 ms` | `  2.66 ms` | `  3.86 ms` |

#### 0005-kb.js
clk: ~3.61 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.16 ms/iter` | `998.25 µs` | `  1.18 ms` | `  2.21 ms` | `  3.13 ms` |
| babel | `  1.56 ms/iter` | `  1.30 ms` | `  1.64 ms` | `  2.72 ms` | `  3.42 ms` |

#### 0006-kb.jsx
clk: ~3.59 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.68 ms/iter` | `  1.46 ms` | `  1.76 ms` | `  3.60 ms` | `  4.11 ms` |
| babel | `  2.26 ms/iter` | `  1.76 ms` | `  2.42 ms` | `  4.08 ms` | `  4.85 ms` |

#### 0010-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.65 ms/iter` | `  2.24 ms` | `  2.76 ms` | `  4.75 ms` | `  5.26 ms` |
| babel | `  3.44 ms/iter` | `  2.79 ms` | `  3.61 ms` | `  6.09 ms` | `  7.01 ms` |

#### 0028-kb.js
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.44 ms/iter` | `  6.50 ms` | `  7.66 ms` | `  9.63 ms` | ` 10.15 ms` |
| babel | `  9.30 ms/iter` | `  8.37 ms` | `  9.30 ms` | ` 12.42 ms` | ` 13.56 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.29 ms/iter` | ` 47.90 ms` | ` 51.53 ms` | ` 53.07 ms` | ` 62.47 ms` |
| babel | ` 76.53 ms/iter` | ` 63.74 ms` | ` 76.91 ms` | ` 90.15 ms` | `119.21 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 45.66 ms/iter` | ` 43.03 ms` | ` 46.43 ms` | ` 48.51 ms` | ` 54.47 ms` |
| babel | ` 66.13 ms/iter` | ` 56.23 ms` | ` 65.92 ms` | ` 84.61 ms` | `105.15 ms` |

#### 0554-kb.js
clk: ~3.46 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `186.36 ms/iter` | `174.02 ms` | `184.07 ms` | `187.01 ms` | `249.51 ms` |
| babel | `346.78 ms/iter` | `308.25 ms` | `343.96 ms` | `383.72 ms` | `455.20 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.52 s/iter` | `   3.43 s` | `   3.55 s` | `   3.62 s` | `   3.73 s` |

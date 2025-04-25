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

Drop in replacement for:

- JS(X): `babel` parser
- TS(X): `typescript` parser

## TODO

- Wait or improve TS-ESLint alignment
  - https://github.com/oxc-project/oxc/issues/9705
- Verify diffs
- Add benchmark for TS(X)
- Postprocess AST
  - JS: Remove useless extra parens
  - JS/TS: rebalance logical exprs, etc...
- Remove `addCommentLocation` transform
  - This can be done if using Prettier@main

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

> [!WARNING]
> This benchmark does not verify formatted output.

- OXC version: `0.63.0`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `103.87 µs/iter` | ` 78.63 µs` | ` 97.88 µs` | `535.00 µs` | `  1.82 ms` |
| babel | `101.72 µs/iter` | ` 81.79 µs` | ` 97.67 µs` | `492.00 µs` | `  1.56 ms` |

#### 0001-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `639.80 µs/iter` | `509.79 µs` | `639.75 µs` | `  1.47 ms` | `  2.51 ms` |
| babel | `769.63 µs/iter` | `598.42 µs` | `797.25 µs` | `  1.47 ms` | `  2.43 ms` |

#### 0003-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.21 ms/iter` | `  1.01 ms` | `  1.26 ms` | `  2.34 ms` | `  3.03 ms` |
| babel | `  1.54 ms/iter` | `  1.28 ms` | `  1.67 ms` | `  2.74 ms` | `  3.46 ms` |

#### 0005-kb.js
clk: ~3.74 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.03 ms/iter` | `908.04 µs` | `  1.01 ms` | `  2.14 ms` | `  2.87 ms` |
| babel | `  1.58 ms/iter` | `  1.28 ms` | `  1.67 ms` | `  3.20 ms` | `  3.76 ms` |

#### 0006-kb.jsx
clk: ~3.68 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.56 ms/iter` | `  1.36 ms` | `  1.62 ms` | `  3.10 ms` | `  3.86 ms` |
| babel | `  2.17 ms/iter` | `  1.77 ms` | `  2.36 ms` | `  3.86 ms` | `  5.07 ms` |

#### 0010-kb.js
clk: ~3.57 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.40 ms/iter` | `  2.11 ms` | `  2.51 ms` | `  3.88 ms` | `  4.73 ms` |
| babel | `  3.39 ms/iter` | `  2.71 ms` | `  3.54 ms` | `  6.18 ms` | `  6.97 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.01 ms/iter` | `  6.24 ms` | `  7.15 ms` | `  8.93 ms` | `  9.45 ms` |
| babel | `  9.41 ms/iter` | `  8.35 ms` | `  9.49 ms` | ` 13.46 ms` | ` 14.60 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 50.91 ms/iter` | ` 48.30 ms` | ` 50.59 ms` | ` 54.41 ms` | ` 60.83 ms` |
| babel | ` 77.60 ms/iter` | ` 65.33 ms` | ` 75.51 ms` | ` 89.22 ms` | `121.41 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 43.70 ms/iter` | ` 41.30 ms` | ` 42.87 ms` | ` 48.26 ms` | ` 52.48 ms` |
| babel | ` 75.68 ms/iter` | ` 56.05 ms` | ` 65.63 ms` | `114.02 ms` | `149.14 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `185.70 ms/iter` | `171.09 ms` | `180.65 ms` | `234.04 ms` | `236.70 ms` |
| babel | `361.66 ms/iter` | `314.60 ms` | `358.94 ms` | `405.87 ms` | `518.68 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `   1.13 s/iter` | `   1.10 s` | `   1.13 s` | `   1.16 s` | `   1.21 s` |
| babel | `   3.51 s/iter` | `   3.42 s` | `   3.53 s` | `   3.55 s` | `   3.56 s` |


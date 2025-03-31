# prettier-plugin-oxc

> [!WARNING]
> - This is experimental plugin using experimental feature!
> - Formatted output is not verified yet
> - May not work for TypeScript, since OXC's TS AST for JavaScript land is not yet stabilized(aims to align TS-ESLint)
>   - See https://github.com/oxc-project/oxc/issues/9705

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

## TODO

- Verify output
  - Clone Prettier repo for test files
  - Use Prettier@main to track latest changes(`loc.end` refactor, etc)
  - Dump `Doc` using `babel` for JS and `typescript` for TS
  - Dump `Doc` using `oxc` for JS and `oxc-ts` for TS
  - Save diff as snapshots
- Remove `addCommentLocation` transform
  - This can be removed if using Prettier@main for debug and benchmark
- Postprocess AST
  - JS: Remove useless extra parens
  - JS/TS: rebalance logical exprs, etc...

## Debug

```sh
node debug.js
./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc debug.js
./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc ./benchmark/fixtures/0028-kb.js
```

## Benchmark

```sh
node --expose-gc benchmark/run.js
```

> [!WARNING]
> This benchmark does not verify formatted output.

### JS(X) Benchmarks
#### 0000-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `104.85 µs/iter` | ` 78.75 µs` | ` 97.92 µs` | `539.50 µs` | `  1.76 ms` |
| babel | `101.80 µs/iter` | ` 81.63 µs` | ` 97.96 µs` | `488.54 µs` | `  1.37 ms` |

#### 0001-kb.js
clk: ~3.75 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `634.90 µs/iter` | `521.75 µs` | `636.42 µs` | `  1.38 ms` | `  2.45 ms` |
| babel | `765.58 µs/iter` | `626.42 µs` | `797.50 µs` | `  1.35 ms` | `  3.01 ms` |

#### 0003-kb.jsx
clk: ~3.71 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.19 ms/iter` | `  1.03 ms` | `  1.24 ms` | `  2.08 ms` | `  2.99 ms` |
| babel | `  1.52 ms/iter` | `  1.27 ms` | `  1.68 ms` | `  2.64 ms` | `  3.33 ms` |

#### 0005-kb.js
clk: ~3.56 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.03 ms/iter` | `906.33 µs` | `  1.01 ms` | `  2.02 ms` | `  2.80 ms` |
| babel | `  1.56 ms/iter` | `  1.27 ms` | `  1.62 ms` | `  3.21 ms` | `  3.72 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.55 ms/iter` | `  1.36 ms` | `  1.59 ms` | `  3.29 ms` | `  4.05 ms` |
| babel | `  2.17 ms/iter` | `  1.75 ms` | `  2.35 ms` | `  4.55 ms` | `  4.91 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.41 ms/iter` | `  2.12 ms` | `  2.49 ms` | `  4.25 ms` | `  5.73 ms` |
| babel | `  3.32 ms/iter` | `  2.69 ms` | `  3.46 ms` | `  6.18 ms` | `  6.67 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.02 ms/iter` | `  6.23 ms` | `  7.21 ms` | ` 10.06 ms` | ` 10.15 ms` |
| babel | `  9.45 ms/iter` | `  8.39 ms` | `  9.83 ms` | ` 13.24 ms` | ` 13.37 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 50.89 ms/iter` | ` 47.74 ms` | ` 50.81 ms` | ` 54.06 ms` | ` 59.36 ms` |
| babel | ` 76.37 ms/iter` | ` 64.76 ms` | ` 74.56 ms` | ` 91.26 ms` | `119.59 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 43.56 ms/iter` | ` 40.97 ms` | ` 44.52 ms` | ` 47.42 ms` | ` 50.20 ms` |
| babel | ` 66.10 ms/iter` | ` 56.02 ms` | ` 63.99 ms` | ` 80.89 ms` | `104.45 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `182.34 ms/iter` | `169.84 ms` | `183.96 ms` | `185.15 ms` | `233.15 ms` |
| babel | `344.41 ms/iter` | `309.16 ms` | `349.43 ms` | `405.65 ms` | `452.89 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `   1.13 s/iter` | `   1.09 s` | `   1.15 s` | `   1.18 s` | `   1.18 s` |
| babel | `   3.48 s/iter` | `   3.41 s` | `   3.49 s` | `   3.53 s` | `   3.54 s` |


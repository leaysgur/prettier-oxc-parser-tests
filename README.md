# prettier-plugin-oxc

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

> [!WARNING]
> - Formatted output is not verified yet
> - May not work for TypeScript since OXC's TypeScript AST structure for JavaScript land(aims to align TS-ESLint) is not yet stabilized
>   - See https://github.com/oxc-project/oxc/issues/9705

## TODO

- Postprocess AST
  - Remove useless extra parens, rebalance logical exprs, etc... to align Babel outputs
- Verify output

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
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `103.78 µs/iter` | ` 78.67 µs` | ` 97.33 µs` | `530.92 µs` | `  1.87 ms` |
| babel | `101.25 µs/iter` | ` 81.13 µs` | ` 98.00 µs` | `486.88 µs` | `  1.53 ms` |

#### 0001-kb.js
clk: ~3.75 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `631.77 µs/iter` | `518.17 µs` | `627.29 µs` | `  1.39 ms` | `  2.63 ms` |
| babel | `766.39 µs/iter` | `628.67 µs` | `786.92 µs` | `  1.39 ms` | `  2.37 ms` |

#### 0003-kb.jsx
clk: ~3.65 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.22 ms/iter` | `  1.03 ms` | `  1.30 ms` | `  2.41 ms` | `  3.27 ms` |
| babel | `  1.58 ms/iter` | `  1.27 ms` | `  1.73 ms` | `  2.92 ms` | `  3.85 ms` |

#### 0005-kb.js
clk: ~3.56 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.01 ms/iter` | `891.29 µs` | `996.67 µs` | `  1.83 ms` | `  3.00 ms` |
| babel | `  1.56 ms/iter` | `  1.28 ms` | `  1.65 ms` | `  3.00 ms` | `  3.48 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.57 ms/iter` | `  1.37 ms` | `  1.63 ms` | `  3.38 ms` | `  4.28 ms` |
| babel | `  2.15 ms/iter` | `  1.76 ms` | `  2.33 ms` | `  3.97 ms` | `  4.89 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.40 ms/iter` | `  2.10 ms` | `  2.49 ms` | `  4.54 ms` | `  5.53 ms` |
| babel | `  3.31 ms/iter` | `  2.69 ms` | `  3.45 ms` | `  5.89 ms` | `  6.35 ms` |

#### 0028-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.23 ms/iter` | `  6.44 ms` | `  7.45 ms` | `  9.57 ms` | `  9.66 ms` |
| babel | `  9.44 ms/iter` | `  8.37 ms` | `  9.73 ms` | ` 12.31 ms` | ` 13.01 ms` |

#### 0080-kb.mjs
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.31 ms/iter` | ` 48.48 ms` | ` 51.33 ms` | ` 53.21 ms` | ` 61.83 ms` |
| babel | ` 76.82 ms/iter` | ` 64.69 ms` | ` 75.98 ms` | ` 90.75 ms` | `123.95 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 43.39 ms/iter` | ` 41.58 ms` | ` 43.21 ms` | ` 47.13 ms` | ` 49.89 ms` |
| babel | ` 67.14 ms/iter` | ` 56.78 ms` | ` 65.97 ms` | ` 83.99 ms` | `106.07 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `190.57 ms/iter` | `178.77 ms` | `190.62 ms` | `191.41 ms` | `245.85 ms` |
| babel | `347.42 ms/iter` | `313.68 ms` | `348.02 ms` | `389.52 ms` | `450.49 ms` |

#### 3930-kb.js
clk: ~3.59 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `   1.84 s/iter` | `   1.78 s` | `   1.88 s` | `   1.88 s` | `   1.90 s` |
| babel | `   3.48 s/iter` | `   3.41 s` | `   3.50 s` | `   3.52 s` | `   3.52 s` |

# prettier-plugin-oxc

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

> [!WARNING]
> Current limitations:
> - Fails sometimes when Prettier requires `loc: { [start|end]: { line, column }}` in its logic, which OXC ESTree does not have
> - May not work for TypeScript since OXC's TypeScript AST structure for JavaScript land(aims to align TS-ESLint) is not yet stabilized
>   - See https://github.com/oxc-project/oxc/issues/9705

## TODO

- Postprocess AST
  - Remove useless extra parens, rebalance logical exprs to align Babel outputs

## Debug

```sh
node debug.js
./node_modules/bin/prettier debug.js --plugin=prettier-plugin-oxc --parser=oxc
```

## Benchmark

```sh
node --expose-gc benchmark/run.js
```

### JS(X) Benchmarks
#### 0000-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `101.88 µs/iter` | ` 78.25 µs` | ` 94.83 µs` | `527.46 µs` | `  1.40 ms` |
| babel | ` 99.05 µs/iter` | ` 80.88 µs` | ` 96.13 µs` | `495.08 µs` | `  1.37 ms` |

#### 0001-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `667.36 µs/iter` | `514.46 µs` | `649.38 µs` | `  1.62 ms` | `  3.13 ms` |
| babel | `773.20 µs/iter` | `605.71 µs` | `815.33 µs` | `  1.52 ms` | `  2.33 ms` |

#### 0003-kb.jsx
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.19 ms/iter` | `982.67 µs` | `  1.25 ms` | `  1.95 ms` | `  3.29 ms` |
| babel | `  1.49 ms/iter` | `  1.20 ms` | `  1.62 ms` | `  2.36 ms` | `  3.11 ms` |

#### 0005-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.13 ms/iter` | `939.71 µs` | `  1.17 ms` | `  1.99 ms` | `  3.24 ms` |
| babel | `  1.53 ms/iter` | `  1.24 ms` | `  1.61 ms` | `  2.65 ms` | `  3.65 ms` |

#### 0006-kb.jsx
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.68 ms/iter` | `  1.45 ms` | `  1.74 ms` | `  3.39 ms` | `  3.96 ms` |
| babel | `  2.17 ms/iter` | `  1.77 ms` | `  2.39 ms` | `  4.01 ms` | `  4.54 ms` |

#### 0010-kb.js
clk: ~3.68 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.95 ms/iter` | `  2.19 ms` | `  2.92 ms` | `  7.61 ms` | ` 11.34 ms` |
| babel | `  3.47 ms/iter` | `  2.77 ms` | `  3.73 ms` | `  5.55 ms` | `  5.87 ms` |

#### 0028-kb.js
clk: ~3.51 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.40 ms/iter` | `  6.55 ms` | `  7.58 ms` | `  9.64 ms` | `  9.78 ms` |
| babel | `  9.45 ms/iter` | `  8.50 ms` | `  9.55 ms` | ` 12.31 ms` | ` 12.87 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.29 ms/iter` | ` 48.49 ms` | ` 51.24 ms` | ` 54.56 ms` | ` 58.03 ms` |
| babel | ` 76.89 ms/iter` | ` 65.73 ms` | ` 74.48 ms` | ` 91.28 ms` | `119.75 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 45.10 ms/iter` | ` 42.79 ms` | ` 45.95 ms` | ` 47.09 ms` | ` 52.21 ms` |
| babel | ` 66.90 ms/iter` | ` 57.36 ms` | ` 66.50 ms` | ` 82.68 ms` | `104.10 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `185.23 ms/iter` | `173.06 ms` | `183.27 ms` | `185.16 ms` | `249.52 ms` |
| babel | `347.14 ms/iter` | `315.98 ms` | `344.06 ms` | `397.78 ms` | `445.88 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.53 s/iter` | `   3.34 s` | `   3.57 s` | `   3.62 s` | `   3.75 s` |

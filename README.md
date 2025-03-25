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

- Add `Locations`
- Postprocess AST
  - Remove useless extra parens, rebalance logical exprs, etc... to align Babel outputs
- Verify output

## Debug

```sh
node debug.js
./node_modules/bin/prettier debug.js --plugin=prettier-plugin-oxc --parser=oxc
```

## Benchmark

```sh
node --expose-gc benchmark/run.js
```

> [!WARNING]
> This benchmark does not ensure formatted output.

### JS(X) Benchmarks
#### 0000-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `105.03 µs/iter` | ` 78.79 µs` | ` 95.79 µs` | `561.08 µs` | `  1.37 ms` |
| babel | `101.04 µs/iter` | ` 81.54 µs` | ` 97.08 µs` | `500.04 µs` | `  1.45 ms` |

#### 0001-kb.js
clk: ~2.00 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `640.52 µs/iter` | `516.54 µs` | `639.21 µs` | `  1.34 ms` | `  2.50 ms` |
| babel | `765.19 µs/iter` | `629.17 µs` | `793.92 µs` | `  1.54 ms` | `  2.31 ms` |

#### 0003-kb.jsx
clk: ~3.72 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.20 ms/iter` | `  1.04 ms` | `  1.24 ms` | `  2.16 ms` | `  3.24 ms` |
| babel | `  1.52 ms/iter` | `  1.27 ms` | `  1.65 ms` | `  2.52 ms` | `  3.25 ms` |

#### 0005-kb.js
clk: ~3.64 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.12 ms/iter` | `974.54 µs` | `  1.14 ms` | `  2.00 ms` | `  2.82 ms` |
| babel | `  1.54 ms/iter` | `  1.28 ms` | `  1.56 ms` | `  2.83 ms` | `  3.40 ms` |

#### 0006-kb.jsx
clk: ~3.57 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.69 ms/iter` | `  1.46 ms` | `  1.76 ms` | `  3.53 ms` | `  4.22 ms` |
| babel | `  2.15 ms/iter` | `  1.77 ms` | `  2.33 ms` | `  3.77 ms` | `  4.30 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.60 ms/iter` | `  2.21 ms` | `  2.69 ms` | `  4.49 ms` | `  5.17 ms` |
| babel | `  3.36 ms/iter` | `  2.76 ms` | `  3.56 ms` | `  5.38 ms` | `  5.89 ms` |

#### 0028-kb.js
clk: ~3.53 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.85 ms/iter` | `  6.80 ms` | `  8.18 ms` | ` 10.73 ms` | ` 11.34 ms` |
| babel | `  9.53 ms/iter` | `  8.55 ms` | `  9.56 ms` | ` 13.42 ms` | ` 13.52 ms` |

#### 0080-kb.mjs
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.77 ms/iter` | ` 48.74 ms` | ` 54.54 ms` | ` 54.76 ms` | ` 55.58 ms` |
| babel | ` 77.50 ms/iter` | ` 64.89 ms` | ` 75.11 ms` | ` 94.88 ms` | `121.91 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 45.78 ms/iter` | ` 43.14 ms` | ` 45.29 ms` | ` 47.97 ms` | ` 56.18 ms` |
| babel | ` 66.38 ms/iter` | ` 57.01 ms` | ` 63.74 ms` | ` 83.64 ms` | `104.70 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `187.74 ms/iter` | `175.38 ms` | `187.44 ms` | `191.50 ms` | `240.41 ms` |
| babel | `346.62 ms/iter` | `315.95 ms` | `351.67 ms` | `380.69 ms` | `452.02 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.56 s/iter` | `   3.38 s` | `   3.64 s` | `   3.73 s` | `   3.83 s` |

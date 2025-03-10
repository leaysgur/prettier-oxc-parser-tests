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
> - Cannot format JSX currently
>   - Prettier expects `JSXText` nodes to have a `raw` property, but OXC does not provide this
> - Fails in some cases:
>   - When Prettier requires `loc: { [start|end]: { line, column }}` in its logic, which OXC does not offer
>   - TypeScript may not work since OXC's TypeScript AST structure for JavaScript is not yet stabilized

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
| oxc   | `101.57 µs/iter` | ` 78.42 µs` | ` 95.71 µs` | `532.42 µs` | `  1.84 ms` |
| babel | `100.49 µs/iter` | ` 82.00 µs` | ` 97.04 µs` | `504.42 µs` | `  1.39 ms` |

#### 0001-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `627.24 µs/iter` | `492.88 µs` | `625.33 µs` | `  1.35 ms` | `  2.78 ms` |
| babel | `760.30 µs/iter` | `595.29 µs` | `792.46 µs` | `  1.46 ms` | `  2.44 ms` |

#### 0003-kb.jsx
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  1.46 ms/iter` | `  1.16 ms` | `  1.55 ms` | `  2.91 ms` | `  3.23 ms` |

#### 0005-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.11 ms/iter` | `908.04 µs` | `  1.13 ms` | `  1.99 ms` | `  2.87 ms` |
| babel | `  1.51 ms/iter` | `  1.23 ms` | `  1.59 ms` | `  2.64 ms` | `  3.50 ms` |

#### 0006-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  2.28 ms/iter` | `  1.76 ms` | `  2.43 ms` | `  4.74 ms` | `  5.71 ms` |

#### 0010-kb.js
clk: ~3.66 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.55 ms/iter` | `  2.19 ms` | `  2.65 ms` | `  4.22 ms` | `  4.74 ms` |
| babel | `  3.47 ms/iter` | `  2.74 ms` | `  3.71 ms` | `  6.01 ms` | `  6.79 ms` |

#### 0028-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.35 ms/iter` | `  6.43 ms` | `  7.56 ms` | ` 10.65 ms` | ` 10.78 ms` |
| babel | `  9.33 ms/iter` | `  8.29 ms` | `  9.37 ms` | ` 12.22 ms` | ` 13.21 ms` |

#### 0080-kb.mjs
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 52.56 ms/iter` | ` 47.72 ms` | ` 54.29 ms` | ` 56.34 ms` | ` 60.92 ms` |
| babel | ` 77.71 ms/iter` | ` 63.79 ms` | ` 78.43 ms` | ` 94.97 ms` | `120.75 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 44.52 ms/iter` | ` 42.70 ms` | ` 46.19 ms` | ` 46.69 ms` | ` 48.30 ms` |
| babel | ` 68.46 ms/iter` | ` 57.08 ms` | ` 72.38 ms` | ` 85.04 ms` | `109.92 ms` |

#### 0554-kb.js
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `189.71 ms/iter` | `171.32 ms` | `191.66 ms` | `200.23 ms` | `257.48 ms` |
| babel | `346.70 ms/iter` | `315.12 ms` | `346.01 ms` | `384.76 ms` | `464.14 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.55 s/iter` | `   3.44 s` | `   3.58 s` | `   3.59 s` | `   3.75 s` |

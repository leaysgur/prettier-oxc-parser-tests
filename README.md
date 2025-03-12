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
> - Cannot format JSX
>   - Prettier expects `JSXText` node to have a `raw` property, but OXC does not provide this [yet](https://github.com/oxc-project/oxc/issues/9667)
> - Fails sometimes when Prettier requires `loc: { [start|end]: { line, column }}` in its logic, which OXC ESTree does not have
> - May not work for TS(X) since OXC's TypeScript AST structure for JavaScript land(aims TS-ESTree) is not yet stabilized

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
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `101.71 µs/iter` | ` 77.92 µs` | ` 94.67 µs` | `532.63 µs` | `  1.69 ms` |
| babel | `100.06 µs/iter` | ` 80.79 µs` | ` 96.46 µs` | `477.92 µs` | `  1.40 ms` |

#### 0001-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `631.61 µs/iter` | `497.83 µs` | `633.50 µs` | `  1.38 ms` | `  2.49 ms` |
| babel | `757.74 µs/iter` | `600.21 µs` | `790.50 µs` | `  1.37 ms` | `  2.37 ms` |

#### 0003-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  1.49 ms/iter` | `  1.19 ms` | `  1.60 ms` | `  3.11 ms` | `  4.06 ms` |

#### 0005-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.13 ms/iter` | `918.29 µs` | `  1.19 ms` | `  2.10 ms` | `  3.15 ms` |
| babel | `  1.53 ms/iter` | `  1.27 ms` | `  1.61 ms` | `  2.72 ms` | `  3.42 ms` |

#### 0006-kb.jsx
clk: ~3.73 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  2.14 ms/iter` | `  1.75 ms` | `  2.32 ms` | `  4.17 ms` | `  5.10 ms` |

#### 0010-kb.js
clk: ~3.64 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.54 ms/iter` | `  2.21 ms` | `  2.64 ms` | `  4.37 ms` | `  4.94 ms` |
| babel | `  3.40 ms/iter` | `  2.79 ms` | `  3.58 ms` | `  6.36 ms` | `  7.05 ms` |

#### 0028-kb.js
clk: ~3.66 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.44 ms/iter` | `  6.59 ms` | `  7.67 ms` | `  9.68 ms` | `  9.82 ms` |
| babel | `  9.60 ms/iter` | `  8.46 ms` | `  9.65 ms` | ` 13.56 ms` | ` 14.60 ms` |

#### 0080-kb.mjs
clk: ~3.57 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 51.09 ms/iter` | ` 48.53 ms` | ` 51.46 ms` | ` 55.22 ms` | ` 58.20 ms` |
| babel | ` 77.89 ms/iter` | ` 65.71 ms` | ` 75.33 ms` | `101.08 ms` | `117.83 ms` |

#### 0143-kb.js
clk: ~3.56 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 44.64 ms/iter` | ` 42.71 ms` | ` 44.51 ms` | ` 49.13 ms` | ` 49.42 ms` |
| babel | ` 67.16 ms/iter` | ` 56.95 ms` | ` 67.89 ms` | ` 81.53 ms` | `103.05 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `188.29 ms/iter` | `177.84 ms` | `187.30 ms` | `189.37 ms` | `245.91 ms` |
| babel | `345.43 ms/iter` | `321.75 ms` | `343.59 ms` | `384.36 ms` | `455.49 ms` |

#### 3930-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.59 s/iter` | `   3.43 s` | `   3.61 s` | `   3.73 s` | `   3.74 s` |

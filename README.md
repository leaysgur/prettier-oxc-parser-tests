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
  - Remove useless extra parens, rebalance logical exprs

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
| oxc   | `103.03 µs/iter` | ` 78.21 µs` | ` 96.42 µs` | `539.08 µs` | `  1.83 ms` |
| babel | `101.00 µs/iter` | ` 81.38 µs` | ` 97.42 µs` | `498.83 µs` | `  1.56 ms` |

#### 0001-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `637.11 µs/iter` | `498.83 µs` | `634.71 µs` | `  1.47 ms` | `  2.55 ms` |
| babel | `761.08 µs/iter` | `594.13 µs` | `785.88 µs` | `  1.59 ms` | `  2.45 ms` |

#### 0003-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  1.48 ms/iter` | `  1.18 ms` | `  1.62 ms` | `  3.02 ms` | `  3.52 ms` |

#### 0006-kb.jsx
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Array.prototype.some called on null or undefined |
| babel | `  2.18 ms/iter` | `  1.77 ms` | `  2.37 ms` | `  4.54 ms` | `  5.09 ms` |

#### 0010-kb.js
clk: ~3.67 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.51 ms/iter` | `  2.18 ms` | `  2.62 ms` | `  4.38 ms` | `  4.71 ms` |
| babel | `  3.29 ms/iter` | `  2.71 ms` | `  3.47 ms` | `  5.48 ms` | `  6.50 ms` |

#### 0028-kb.js
clk: ~3.74 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.34 ms/iter` | `  6.53 ms` | `  7.53 ms` | `  9.79 ms` | ` 10.31 ms` |
| babel | `  9.43 ms/iter` | `  8.38 ms` | `  9.50 ms` | ` 12.50 ms` | ` 13.13 ms` |

#### 0143-kb.js
clk: ~3.58 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 46.79 ms/iter` | ` 42.90 ms` | ` 46.55 ms` | ` 52.58 ms` | ` 52.76 ms` |
| babel | ` 68.39 ms/iter` | ` 56.75 ms` | ` 67.83 ms` | ` 88.33 ms` | `105.68 ms` |

#### 0554-kb.js
clk: ~3.56 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `184.03 ms/iter` | `171.15 ms` | `181.71 ms` | `188.39 ms` | `249.30 ms` |
| babel | `346.93 ms/iter` | `309.65 ms` | `355.22 ms` | `423.80 ms` | `448.99 ms` |

#### 4000-kb.js
clk: ~3.57 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | error: Cannot read properties of undefined (reading 'start') |
| babel | `   3.56 s/iter` | `   3.41 s` | `   3.62 s` | `   3.64 s` | `   3.71 s` |

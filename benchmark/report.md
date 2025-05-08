## Benchmark report
- OXC version: `0.68.1`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `107.02 µs/iter` | ` 78.58 µs` | ` 98.83 µs` | `550.63 µs` | `  1.72 ms` |
| babel | `100.85 µs/iter` | ` 81.21 µs` | ` 96.88 µs` | `481.96 µs` | `  1.54 ms` |

#### 0001-kb.js
clk: ~3.79 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `650.27 µs/iter` | `525.17 µs` | `641.13 µs` | `  1.47 ms` | `  2.86 ms` |
| babel | `768.05 µs/iter` | `625.54 µs` | `797.13 µs` | `  1.47 ms` | `  2.41 ms` |

#### 0003-kb.jsx
clk: ~3.76 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.20 ms/iter` | `  1.02 ms` | `  1.24 ms` | `  2.17 ms` | `  2.99 ms` |
| babel | `  1.51 ms/iter` | `  1.25 ms` | `  1.63 ms` | `  2.93 ms` | `  3.60 ms` |

#### 0005-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.13 ms/iter` | `973.79 µs` | `  1.16 ms` | `  2.22 ms` | `  3.04 ms` |
| babel | `  1.52 ms/iter` | `  1.27 ms` | `  1.58 ms` | `  2.53 ms` | `  3.59 ms` |

#### 0006-kb.jsx
clk: ~3.60 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.70 ms/iter` | `  1.45 ms` | `  1.76 ms` | `  3.57 ms` | `  4.78 ms` |
| babel | `  2.11 ms/iter` | `  1.74 ms` | `  2.30 ms` | `  3.96 ms` | `  4.18 ms` |

#### 0010-kb.js
clk: ~3.52 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.50 ms/iter` | `  2.18 ms` | `  2.58 ms` | `  4.33 ms` | `  4.62 ms` |
| babel | `  3.37 ms/iter` | `  2.74 ms` | `  3.57 ms` | `  5.53 ms` | `  5.70 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.31 ms/iter` | `  6.50 ms` | `  7.47 ms` | `  9.66 ms` | ` 10.81 ms` |
| babel | `  9.22 ms/iter` | `  8.19 ms` | `  9.35 ms` | ` 12.68 ms` | ` 13.20 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 50.97 ms/iter` | ` 47.94 ms` | ` 50.49 ms` | ` 56.54 ms` | ` 58.22 ms` |
| babel | ` 76.12 ms/iter` | ` 64.89 ms` | ` 73.29 ms` | ` 87.41 ms` | `121.22 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 45.58 ms/iter` | ` 42.96 ms` | ` 46.25 ms` | ` 48.93 ms` | ` 53.24 ms` |
| babel | ` 67.42 ms/iter` | ` 56.24 ms` | ` 65.26 ms` | ` 82.52 ms` | `114.04 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `183.90 ms/iter` | `172.70 ms` | `182.69 ms` | `187.29 ms` | `250.27 ms` |
| babel | `348.70 ms/iter` | `308.73 ms` | `357.90 ms` | `402.04 ms` | `451.15 ms` |


### TS(X)
#### 0000-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | `479.83 µs/iter` | `377.17 µs` | `454.29 µs` | `  1.44 ms` | `  2.63 ms` |

#### 0001-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `432.84 µs/iter` | `362.58 µs` | `422.88 µs` | `899.92 µs` | `  2.46 ms` |
| typescript | `845.23 µs/iter` | `684.87 µs` | `849.83 µs` | `  1.88 ms` | `  3.14 ms` |

#### 0003-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `785.18 µs/iter` | `697.88 µs` | `768.46 µs` | `  1.33 ms` | `  2.28 ms` |
| typescript | `  1.51 ms/iter` | `  1.24 ms` | `  1.58 ms` | `  3.50 ms` | `  4.19 ms` |

#### 0007-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Unexpected token. Did you mean `{'>'}` or `&gt;`? |
| typescript | `  5.23 ms/iter` | `  4.34 ms` | `  5.38 ms` | `  8.61 ms` | ` 10.13 ms` |

#### 0008-kb.tsx
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  2.94 ms/iter` | `  2.46 ms` | `  3.07 ms` | `  4.65 ms` | `  5.43 ms` |
| typescript | `  5.72 ms/iter` | `  4.58 ms` | `  6.18 ms` | `  8.73 ms` | `  9.48 ms` |

#### 0015-kb.tsx
clk: ~3.50 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.06 ms/iter` | `  3.41 ms` | `  4.23 ms` | `  6.16 ms` | `  6.82 ms` |
| typescript | `  7.63 ms/iter` | `  6.14 ms` | `  8.14 ms` | ` 12.13 ms` | ` 12.84 ms` |

#### 0021-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.20 ms/iter` | `  3.59 ms` | `  4.27 ms` | `  7.07 ms` | `  7.81 ms` |
| typescript | `  8.59 ms/iter` | `  7.07 ms` | `  9.05 ms` | ` 13.16 ms` | ` 13.61 ms` |

#### 0022-kb.tsx
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'start') |
| typescript | ` 13.05 ms/iter` | ` 10.63 ms` | ` 13.96 ms` | ` 18.01 ms` | ` 18.72 ms` |

#### 0040-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'range') |
| typescript | ` 33.30 ms/iter` | ` 29.32 ms` | ` 34.29 ms` | ` 38.11 ms` | ` 42.29 ms` |

#### 0050-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | ` 27.28 ms/iter` | ` 23.43 ms` | ` 28.60 ms` | ` 32.14 ms` | ` 35.28 ms` |

#### 2922-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | error: Cannot read properties of undefined (reading 'length') |
| typescript | `   1.22 s/iter` | `   1.15 s` | `   1.24 s` | `   1.26 s` | `   1.28 s` |


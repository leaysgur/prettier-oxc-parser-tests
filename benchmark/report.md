## Benchmark report
- OXC version: `0.1.0`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.81 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `107.06 µs/iter` | ` 80.00 µs` | `100.38 µs` | `519.54 µs` | `  1.72 ms` |
| babel | `102.58 µs/iter` | ` 82.50 µs` | ` 98.33 µs` | `476.54 µs` | `  1.45 ms` |

#### 0001-kb.js
clk: ~3.80 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `672.98 µs/iter` | `550.71 µs` | `662.54 µs` | `  1.49 ms` | `  2.67 ms` |
| babel | `761.35 µs/iter` | `623.79 µs` | `792.13 µs` | `  1.47 ms` | `  2.31 ms` |

#### 0003-kb.jsx
clk: ~3.64 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.32 ms/iter` | `  1.07 ms` | `  1.37 ms` | `  2.76 ms` | `  5.29 ms` |
| babel | `  1.58 ms/iter` | `  1.26 ms` | `  1.74 ms` | `  2.80 ms` | `  5.92 ms` |

#### 0005-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.17 ms/iter` | `  1.01 ms` | `  1.19 ms` | `  2.27 ms` | `  3.17 ms` |
| babel | `  1.50 ms/iter` | `  1.25 ms` | `  1.53 ms` | `  2.45 ms` | `  3.28 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.78 ms/iter` | `  1.51 ms` | `  1.87 ms` | `  3.74 ms` | `  3.99 ms` |
| babel | `  2.14 ms/iter` | `  1.74 ms` | `  2.31 ms` | `  3.94 ms` | `  4.37 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.61 ms/iter` | `  2.27 ms` | `  2.73 ms` | `  4.67 ms` | `  4.80 ms` |
| babel | `  3.30 ms/iter` | `  2.73 ms` | `  3.49 ms` | `  5.73 ms` | `  6.48 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.50 ms/iter` | `  6.53 ms` | `  7.69 ms` | ` 10.21 ms` | ` 10.54 ms` |
| babel | `  9.25 ms/iter` | `  8.42 ms` | `  9.30 ms` | ` 12.74 ms` | ` 13.08 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 53.01 ms/iter` | ` 50.91 ms` | ` 53.74 ms` | ` 54.30 ms` | ` 59.86 ms` |
| babel | ` 76.43 ms/iter` | ` 63.36 ms` | ` 75.01 ms` | ` 87.59 ms` | `116.46 ms` |

#### 0143-kb.js
clk: ~1.86 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 48.28 ms/iter` | ` 45.22 ms` | ` 48.81 ms` | ` 50.73 ms` | ` 59.75 ms` |
| babel | ` 66.42 ms/iter` | ` 55.80 ms` | ` 65.73 ms` | ` 81.66 ms` | `111.58 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `194.54 ms/iter` | `180.58 ms` | `192.54 ms` | `197.84 ms` | `260.30 ms` |
| babel | `342.70 ms/iter` | `308.52 ms` | `339.74 ms` | `397.71 ms` | `450.84 ms` |


### TS(X)
#### 0000-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `271.70 µs/iter` | `228.17 µs` | `261.38 µs` | `725.21 µs` | `  1.99 ms` |
| typescript | `466.11 µs/iter` | `365.67 µs` | `445.00 µs` | `  1.38 ms` | `  2.86 ms` |

#### 0001-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `463.46 µs/iter` | `385.37 µs` | `458.21 µs` | `985.83 µs` | `  2.59 ms` |
| typescript | `851.12 µs/iter` | `680.58 µs` | `863.13 µs` | `  2.03 ms` | `  3.19 ms` |

#### 0003-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `825.66 µs/iter` | `725.50 µs` | `800.04 µs` | `  1.66 ms` | `  2.93 ms` |
| typescript | `  1.47 ms/iter` | `  1.20 ms` | `  1.58 ms` | `  3.38 ms` | `  4.01 ms` |

#### 0007-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  2.58 ms/iter` | `  2.21 ms` | `  2.71 ms` | `  4.56 ms` | `  5.29 ms` |
| typescript | `  4.80 ms/iter` | `  3.81 ms` | `  5.06 ms` | `  9.14 ms` | `  9.32 ms` |

#### 0008-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  3.07 ms/iter` | `  2.58 ms` | `  3.20 ms` | `  5.56 ms` | `  6.08 ms` |
| typescript | `  5.60 ms/iter` | `  4.44 ms` | `  5.91 ms` | `  9.06 ms` | `  9.13 ms` |

#### 0015-kb.tsx
clk: ~1.86 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.20 ms/iter` | `  3.51 ms` | `  4.32 ms` | `  7.43 ms` | `  7.67 ms` |
| typescript | `  7.18 ms/iter` | `  5.91 ms` | `  7.45 ms` | ` 11.98 ms` | ` 12.25 ms` |

#### 0021-kb.tsx
clk: ~3.43 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.35 ms/iter` | `  3.70 ms` | `  4.45 ms` | `  6.70 ms` | `  7.76 ms` |
| typescript | `  8.19 ms/iter` | `  6.76 ms` | `  8.43 ms` | ` 12.76 ms` | ` 13.48 ms` |

#### 0022-kb.tsx
clk: ~3.45 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  6.12 ms/iter` | `  5.23 ms` | `  6.19 ms` | `  9.39 ms` | `  9.63 ms` |
| typescript | ` 11.90 ms/iter` | ` 10.09 ms` | ` 12.67 ms` | ` 16.43 ms` | ` 18.77 ms` |

#### 0040-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | ` 14.20 ms/iter` | ` 13.04 ms` | ` 14.27 ms` | ` 17.60 ms` | ` 18.12 ms` |
| typescript | ` 29.34 ms/iter` | ` 26.30 ms` | ` 30.83 ms` | ` 34.28 ms` | ` 34.38 ms` |

#### 0050-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | ` 12.76 ms/iter` | ` 11.33 ms` | ` 12.82 ms` | ` 17.55 ms` | ` 18.94 ms` |
| typescript | ` 22.82 ms/iter` | ` 20.46 ms` | ` 22.71 ms` | ` 30.79 ms` | ` 31.82 ms` |

#### 2922-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `597.69 ms/iter` | `561.22 ms` | `604.15 ms` | `634.95 ms` | `695.96 ms` |
| typescript | `   1.05 s/iter` | `977.34 ms` | `   1.08 s` | `   1.14 s` | `   1.15 s` |


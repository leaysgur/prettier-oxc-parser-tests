## Benchmark report
- Plugin version: `0.1.0`
- Prettier version: `3.5.3`

### JS(X)
#### 0000-kb.js
clk: ~3.68 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `108.64 µs/iter` | ` 86.29 µs` | `101.58 µs` | `528.17 µs` | `  1.71 ms` |
| babel | `104.80 µs/iter` | ` 88.63 µs` | `100.17 µs` | `474.42 µs` | `  1.46 ms` |

#### 0001-kb.js
clk: ~3.50 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `683.88 µs/iter` | `561.29 µs` | `675.46 µs` | `  1.50 ms` | `  2.54 ms` |
| babel | `765.06 µs/iter` | `624.50 µs` | `797.17 µs` | `  1.43 ms` | `  2.42 ms` |

#### 0003-kb.jsx
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.25 ms/iter` | `  1.07 ms` | `  1.30 ms` | `  2.40 ms` | `  2.89 ms` |
| babel | `  1.51 ms/iter` | `  1.27 ms` | `  1.62 ms` | `  2.65 ms` | `  3.21 ms` |

#### 0005-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.18 ms/iter` | `  1.02 ms` | `  1.20 ms` | `  2.41 ms` | `  3.24 ms` |
| babel | `  1.50 ms/iter` | `  1.27 ms` | `  1.54 ms` | `  2.56 ms` | `  3.44 ms` |

#### 0006-kb.jsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  1.79 ms/iter` | `  1.52 ms` | `  1.88 ms` | `  3.92 ms` | `  4.44 ms` |
| babel | `  2.11 ms/iter` | `  1.74 ms` | `  2.30 ms` | `  3.77 ms` | `  4.10 ms` |

#### 0010-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  2.61 ms/iter` | `  2.25 ms` | `  2.71 ms` | `  4.37 ms` | `  5.02 ms` |
| babel | `  3.29 ms/iter` | `  2.75 ms` | `  3.50 ms` | `  5.64 ms` | `  6.06 ms` |

#### 0028-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `  7.66 ms/iter` | `  6.71 ms` | `  7.79 ms` | ` 10.35 ms` | ` 11.68 ms` |
| babel | `  9.25 ms/iter` | `  8.30 ms` | `  9.37 ms` | ` 11.87 ms` | ` 12.95 ms` |

#### 0080-kb.mjs
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 52.84 ms/iter` | ` 50.07 ms` | ` 53.65 ms` | ` 53.74 ms` | ` 59.76 ms` |
| babel | ` 74.43 ms/iter` | ` 64.22 ms` | ` 72.60 ms` | ` 97.57 ms` | `117.99 ms` |

#### 0143-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | ` 47.49 ms/iter` | ` 44.54 ms` | ` 46.64 ms` | ` 52.02 ms` | ` 56.03 ms` |
| babel | ` 66.80 ms/iter` | ` 56.53 ms` | ` 64.84 ms` | ` 86.35 ms` | `104.32 ms` |

#### 0554-kb.js
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark |              avg |         min |         p75 |         p99 |         max |
| ----- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc   | `195.13 ms/iter` | `181.99 ms` | `194.05 ms` | `197.89 ms` | `260.25 ms` |
| babel | `347.74 ms/iter` | `310.43 ms` | `361.04 ms` | `372.84 ms` | `459.87 ms` |


### TS(X)
#### 0000-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `271.06 µs/iter` | `227.92 µs` | `263.29 µs` | `747.83 µs` | `  1.97 ms` |
| typescript | `467.07 µs/iter` | `372.25 µs` | `446.71 µs` | `  1.32 ms` | `  2.87 ms` |

#### 0001-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `473.27 µs/iter` | `388.88 µs` | `467.33 µs` | `  1.05 ms` | `  2.67 ms` |
| typescript | `870.14 µs/iter` | `692.71 µs` | `869.00 µs` | `  2.24 ms` | `  3.39 ms` |

#### 0003-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `829.17 µs/iter` | `730.38 µs` | `805.00 µs` | `  1.66 ms` | `  2.85 ms` |
| typescript | `  1.47 ms/iter` | `  1.21 ms` | `  1.51 ms` | `  2.99 ms` | `  3.93 ms` |

#### 0007-kb.ts
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  2.59 ms/iter` | `  2.24 ms` | `  2.72 ms` | `  4.41 ms` | `  5.57 ms` |
| typescript | `  4.71 ms/iter` | `  3.82 ms` | `  4.89 ms` | `  8.08 ms` | `  8.61 ms` |

#### 0008-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  3.04 ms/iter` | `  2.59 ms` | `  3.18 ms` | `  5.05 ms` | `  5.66 ms` |
| typescript | `  5.78 ms/iter` | `  4.58 ms` | `  6.20 ms` | `  8.96 ms` | `  9.63 ms` |

#### 0015-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.07 ms/iter` | `  3.54 ms` | `  4.19 ms` | `  6.82 ms` | `  7.56 ms` |
| typescript | `  6.94 ms/iter` | `  5.78 ms` | `  7.14 ms` | ` 10.70 ms` | ` 11.73 ms` |

#### 0021-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  4.36 ms/iter` | `  3.71 ms` | `  4.49 ms` | `  7.09 ms` | `  7.18 ms` |
| typescript | `  8.08 ms/iter` | `  6.66 ms` | `  8.30 ms` | ` 11.70 ms` | ` 13.55 ms` |

#### 0022-kb.tsx
clk: ~3.55 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `  6.21 ms/iter` | `  5.30 ms` | `  6.36 ms` | `  9.42 ms` | `  9.87 ms` |
| typescript | ` 12.35 ms/iter` | ` 10.21 ms` | ` 13.27 ms` | ` 15.75 ms` | ` 17.91 ms` |

#### 0040-kb.ts
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | ` 14.77 ms/iter` | ` 13.20 ms` | ` 14.93 ms` | ` 19.52 ms` | ` 21.52 ms` |
| typescript | ` 26.38 ms/iter` | ` 24.15 ms` | ` 26.78 ms` | ` 32.71 ms` | ` 33.43 ms` |

#### 0050-kb.ts
clk: ~3.51 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | ` 12.91 ms/iter` | ` 11.19 ms` | ` 13.26 ms` | ` 18.60 ms` | ` 20.39 ms` |
| typescript | ` 24.53 ms/iter` | ` 21.07 ms` | ` 25.92 ms` | ` 30.96 ms` | ` 32.12 ms` |

#### 2922-kb.ts
clk: ~3.54 GHz
cpu: Apple M3
runtime: node 22.14.0 (arm64-darwin)

| benchmark  |              avg |         min |         p75 |         p99 |         max |
| ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| oxc-ts     | `586.42 ms/iter` | `561.95 ms` | `593.83 ms` | `611.93 ms` | `637.01 ms` |
| typescript | `   1.03 s/iter` | `975.45 ms` | `   1.03 s` | `   1.05 s` | `   1.16 s` |


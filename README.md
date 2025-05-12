# prettier-oxc-parser-tests

https://github.com/ArnaudBarre/prettier-oxc-parser

This repo just exists to test this plugin in separate repo.

## Debug

```sh
node debug.js

./node_modules/bin/prettier --plugin=prettier-oxc-parser debug.js
./node_modules/bin/prettier --plugin=prettier-oxc-parser ./benchmark/fixtures/ts/2922-kb.ts
```

## Coverage

```sh
# Clone prettier repo next to this repo, then
node coverage/run.js > coverage/report.md
```

See [coverage/report.md](./coverage/report.md)

## Benchmark

```sh
node --expose-gc benchmark/run.js > benchmark/report.md
```

See [benchmark/report.md](./benchmark/report.md)

# prettier-plugin-oxc

Prettier plugin for `.(j|t)sx?` files using `oxc-parser` with `experimentalRawTransfer` option.

```sh
prettier --plugin=prettier-plugin-oxc --parser=oxc-js
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

## TODO

- Benchmark to check this plugin is worth to exist or not
- Postprocess AST

## Debug

```sh
node debug.js
./node_modules/bin/prettier debug.js --plugin=prettier-plugin-oxc --parser=oxc-js
```

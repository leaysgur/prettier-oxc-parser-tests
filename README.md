# prettier-plugin-oxc

> [!IMPORTANT]
>
> - This is experimental plugin using experimental feature!

Prettier plugin for JS(X) and TS(X) files using `oxc-parser` with `experimentalRawTransfer` option. 🚀

This plugin aims to be drop in replacement for:

- JS(X): `babel` parser
- TS(X): `typescript` parser

## Usage

```sh
# For JS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc
# For TS(X)
prettier --plugin=prettier-plugin-oxc --parser=oxc-ts
```

> [!NOTE]
> The `oxc-parser` and the `typescript` parser used by Prettier (`@typescript-eslint/typescript-estree`) have different criteria for judging syntax errors and semantic errors.
> Therefore, while they produce equivalent ASTs and the same formatting results for valid code without errors, this may not hold true for invalid cases.
> The parser used by Prettier seems to be relatively tolerant of these errors, so there might be cases where `oxc-parser` cannot format properly.

## TODO

- Postprocess AST
  - JS: Remove useless extra parens
  - JS/TS: rebalance logical exprs, etc...
- Wait or improve TS-ESLint alignment
  - https://github.com/oxc-project/oxc/issues/9705
  - Then verify diffs
- Support `SourceLocation`(`loc.start/end`)?
  - This is needed for both normal nodes and comments
  - This is unnecessary if using Prettier@main, but not yet released
  - OXC also plans to implement this, but not yet started
    - https://github.com/oxc-project/oxc/issues/10307
- Support deprecated TS-ESTree AST nodes?
  - Prettier still depends on deprecated fields w/ `suppressDeprecatedPropertyWarnings`
    - `TSEnumDeclaration.members`
    - `TSMappedType.typeParameter`
  - Current bench failings (other than `reading 'start'`) are because of this

## Debug

```sh
node debug.js

./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc debug.js
./node_modules/bin/prettier --plugin=prettier-plugin-oxc --parser=oxc ./benchmark/fixtures/0028-kb.js
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

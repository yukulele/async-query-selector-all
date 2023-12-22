# async-query-selector

async version of `querySelector()` and `querySelectorAll()`

## Requirement

* [Bun](https://bun.sh/)

## Install

```bash
bun install
```

## Build

```bash
bun run build
```

## Test

```bash
bun run test
```

## Use

```javascript
import {
  asyncQuerySelector,
  asyncQuerySelectorAll,
} from './dist/async-query-selector.js'

const app = await asyncQuerySelector('.app')
const button = await asyncQuerySelector('button', app)

for await(const img = asyncQuerySelectorAll('img[hidden]', app)){
  img.hidden = false
}
```
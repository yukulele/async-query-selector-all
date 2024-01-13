# async-query-selector-all

async version of `querySelector()` and `querySelectorAll()`

## Install

```bash
npm i async-queryselector
```

## Use

```typescript
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
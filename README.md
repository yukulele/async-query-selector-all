# async-query-selector-all

async version of `querySelector()` and `querySelectorAll()`

## Install

```bash
npm i async-query-selector-all
```

## Use

```typescript
import {
  asyncQuerySelector,
  asyncQuerySelectorAll,
} from 'async-query-selector-all'

const app = await asyncQuerySelector('.app')
const button = await asyncQuerySelector('button', app)

for await(const img = asyncQuerySelectorAll('img[hidden]', app)){
  img.hidden = false
}
```

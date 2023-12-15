import { test, expect } from 'bun:test'
import sleep from './sleep.ts'
import AsyncIterableBuilder from '../src/AsyncIterableBuilder.ts'
test('createAsyncIterable', async () => {
  const { iterable, next } = new AsyncIterableBuilder<number>()
  next(1)
  next(2)
  const values: number[] = []
  let done = false
  ;(async () => {
    for await (const number of iterable) {
      values.push(number)
    }
    done = true
  })()
  await sleep()
  expect(values).toEqual([1, 2])
  expect(done).toBeFalse()
  next(3)
  next(4, true)
  await sleep()
  expect(values).toEqual([1, 2, 3, 4])
  expect(done).toBeTrue()
})

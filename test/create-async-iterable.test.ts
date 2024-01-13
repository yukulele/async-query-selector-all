import { test, expect } from 'bun:test'
import sleep from './sleep.ts'
import AsyncIterableBuilder from '../src/AsyncIterableBuilder.ts'
test('createAsyncIterable', async () => {
  const { iterable, next, done } = new AsyncIterableBuilder<number>()
  next(1)
  next(2)
  const values: number[] = []
  let isDone = false
  ;(async () => {
    for await (const number of iterable) {
      values.push(number)
    }
    isDone = true
  })()
  await sleep()
  expect(values).toEqual([1, 2])
  expect(isDone).toBeFalse()
  next(3)
  next(4)
  await sleep()
  expect(values).toEqual([1, 2, 3, 4])
  expect(isDone).toBeFalse()
  done()
  await sleep()
  expect(values).toEqual([1, 2, 3, 4])
  expect(isDone).toBeTrue()
  expect(next).toThrow()
  expect(done).toThrow()
})

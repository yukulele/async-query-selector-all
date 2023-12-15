import { expectType } from 'tsd'
import AsyncIterableBuilder from '../src/AsyncIterableBuilder.ts'
const { next, iterable } = new AsyncIterableBuilder<number>()
expectType<AsyncIterable<number>>(iterable)
expectType<(value: number, done?: boolean) => void>(next)
next(1)
for await (const value of iterable) {
  expectType<number>(value)
}

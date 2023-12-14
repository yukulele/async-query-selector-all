import { expectType } from 'tsd'
import AsyncIterableBuilder from '../src/AsyncIterableBuilder.ts'
const { next, iterable } = new AsyncIterableBuilder<Number>()
expectType<AsyncIterable<Number>>(iterable)
expectType<(value: number, done?: boolean) => void>(next)
next(1)
for await (const value of iterable) {
  expectType<Number>(value)
}

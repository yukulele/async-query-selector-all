import { describe, test, expect } from 'bun:test'
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { once, whenever } from '../src/async-event.ts'
import sleep from './sleep.ts'

if (!globalThis.window) GlobalRegistrator.register()

describe('async event', () => {
  test('once', async () => {
    const promise = once(window, 'click')
    expect(promise).toBeInstanceOf(Promise)
    setTimeout(() => window.dispatchEvent(new MouseEvent('click')))
    const event = await promise
    expect(event).toBeInstanceOf(MouseEvent)
  })

  test('whenever', async () => {
    const iterable = whenever(window, 'foo')
    expect(iterable[Symbol.asyncIterator]).toBeInstanceOf(Function)
    for (let index = 0; index < 3; index++) {
      const event = new CustomEvent(`foo`, { detail: `bar${index}` })
      sleep(index).then(() => {
        window.dispatchEvent(event)
      })
    }
    for await (const event of iterable) {
      expect(event).toBeInstanceOf(CustomEvent)
      const detail = (<CustomEvent>event).detail as string
      expect(detail).toMatch(/^bar\d+$/)
      if (detail) break
    }
  })
})

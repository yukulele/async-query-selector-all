import AsyncIterableBuilder from 'async-iterable-builder'
import {
  AsyncQuerySelectorAllType,
  AsyncQuerySelectorType,
} from './async-query-selector-types.ts'

const asyncQuerySelector: AsyncQuerySelectorType = (
  selector: string,
  parent: ParentNode = document,
  timeout = Number.POSITIVE_INFINITY,
) =>
  new Promise<Element | void>(resolve => {
    const element = parent.querySelector(selector)
    if (element) return resolve(element)
    const observer = new MutationObserver(() => {
      const element = parent.querySelector(selector)
      if (!element) return
      observer.disconnect()
      return resolve(element)
    })
    observer.observe(parent, {
      subtree: true,
      childList: true,
      attributes: true,
    })
    if (timeout < Number.POSITIVE_INFINITY)
      setTimeout(() => {
        observer.disconnect()
        resolve()
      }, timeout)
  })

const asyncQuerySelectorAll: AsyncQuerySelectorAllType = (
  selector: string,
  parent: ParentNode = document,
  timeout = Number.POSITIVE_INFINITY,
) => {
  const delivered = new WeakSet<Element>()
  const builder = new AsyncIterableBuilder<Element>()
  function checkNewElement() {
    for (const element of parent.querySelectorAll(selector)) {
      if (delivered.has(element)) continue
      delivered.add(element)
      builder.next(element)
    }
  }
  checkNewElement()
  const observer = new MutationObserver(checkNewElement)
  observer.observe(parent, {
    subtree: true,
    childList: true,
    attributes: true,
  })
  if (timeout < Number.POSITIVE_INFINITY)
    setTimeout(() => {
      observer.disconnect()
      builder.done()
    }, timeout)
  return builder.iterable
}
export { asyncQuerySelectorAll, asyncQuerySelector }

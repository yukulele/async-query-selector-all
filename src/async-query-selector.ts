import AsyncIterableBuilder from './async-iterable-builder.js'
import {
  AsyncQuerySelectorAllType,
  AsyncQuerySelectorType,
} from './async-query-selector-types.js'

const asyncQuerySelector: AsyncQuerySelectorType = (
  selector: string,
  parent: ParentNode = document,
) => {
  return new Promise<Element>(resolve => {
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
  })
}

const asyncQuerySelectorAll: AsyncQuerySelectorAllType = (
  selector: string,
  parent: ParentNode = document,
) => {
  const delivered = new WeakSet<Element>()
  const { next, iterable } = new AsyncIterableBuilder<Element>()
  function checkNewElement() {
    for (let element of parent.querySelectorAll(selector)) {
      if (delivered.has(element)) continue
      delivered.add(element)
      next(element)
    }
  }
  checkNewElement()
  const observer = new MutationObserver(checkNewElement)
  observer.observe(parent, {
    subtree: true,
    childList: true,
    attributes: true,
  })
  return iterable
}
export { asyncQuerySelectorAll, asyncQuerySelector }

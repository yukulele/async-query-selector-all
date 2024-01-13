/* eslint-disable max-lines-per-function -- allowed for tests */
import { describe, test, expect } from 'bun:test'
import { expectType } from 'tsd'
import sleep from './sleep.ts'
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import {
  asyncQuerySelector,
  asyncQuerySelectorAll,
} from '../src/async-query-selector.ts'

GlobalRegistrator.register()

document.body.innerHTML = /* html */ `<ul><li></li></ul>`

describe('asyncQuerySelector', () => {
  const list = document.querySelector('ul')!
  test('select an element already in document', async () => {
    const list2 = await asyncQuerySelector('ul')
    expect(list2).toEqual(list)
    expectType<HTMLUListElement>(list2)
  })

  test('select an element already in another element', async () => {
    const first1 = list.querySelector<HTMLLIElement>(':scope > :first-child')
    const first2 = await asyncQuerySelector<HTMLLIElement>(
      ':scope > :first-child',
      list,
    )
    expect(first2).toEqual(first1!)
    expectType<HTMLLIElement>(first2)
  })

  test('select an element not yet in the DOM', async () => {
    const li = document.createElement('li')
    li.classList.add('added')
    setTimeout(() => list.append(li))
    const added1 = list.querySelector(':scope > .added')
    expect(added1).toBeNull()
    const added2 = await asyncQuerySelector(':scope > .added', list)
    const added3 = list.querySelector(':scope > .added')
    expect(added2).toEqual(added3!)
  })

  test('select an element not yet matching selector', async () => {
    const li = document.createElement('li')
    list.append(li)
    setTimeout(() => li.classList.add('classed'))
    const classed1 = list.querySelector(':scope > .classed')
    expect(classed1).toBeNull()
    const classed2 = await asyncQuerySelector(':scope > .classed', list)
    const classed3 = list.querySelector(':scope > .classed')
    expect(classed2).toEqual(classed3!)
  })
})

describe('asyncQuerySelectorAll', () => {
  test('select elements already in DOM', async () => {
    const list = document.createElement('ol')
    list.append(document.createElement('li'), document.createElement('li'))
    document.append(list)
    const items: Element[] = []
    ;(async () => {
      for await (const li of asyncQuerySelectorAll('li', list, 10)) {
        items.push(li)
      }
    })()
    await sleep()
    expect(items).toHaveLength(2)
  })

  test('select elements not yet in DOM', async () => {
    const list = document.createElement('ol')
    list.append(document.createElement('li'), document.createElement('li'))
    document.append(list)
    const items: Element[] = []
    ;(async () => {
      for await (const li of asyncQuerySelectorAll('li', list, 10)) {
        items.push(li)
      }
    })()
    for (let index = 0; index < 3; index++)
      list.append(document.createElement('li'))
    await sleep()
    expect(items).toHaveLength(5)
  })

  test('no select after timeout', async () => {
    const list = document.createElement('ol')
    list.append(document.createElement('li'), document.createElement('li'))
    document.append(list)
    const items: Element[] = []
    ;(async () => {
      for await (const li of asyncQuerySelectorAll('li', list, 10)) {
        items.push(li)
      }
    })()
    expect(items).toHaveLength(0)
    await sleep(20)
    expect(items).toHaveLength(2)
    list.append(document.createElement('li'))
    await sleep()
    expect(items).toHaveLength(2)
  })
})
/* eslint-enable max-lines-per-function -- allowed for tests */

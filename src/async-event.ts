import AsyncIterableBuilder from 'async-iterable-builder'

const once = <Target extends EventTarget, EventType extends string>(
  target: Target,
  event: EventType,
) =>
  new Promise((resolve: (event: Event<Target>) => void) => {
    target.addEventListener(event, resolve, { once: true })
  })

const whenever = <Target extends EventTarget, EventType extends string>(
  target: Target,
  event: EventType,
) => {
  const { iterable, next } = new AsyncIterableBuilder<Event<Target>>()
  target.addEventListener(event, next)
  return iterable
}

export { once, whenever }

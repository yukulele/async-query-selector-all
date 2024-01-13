export default class AsyncIterableBuilder<Type> {
  #isDone = false
  readonly #values: Promise<Type>[] = []
  #resolve!: (value: Type) => void
  #reject!: () => void
  readonly iterable: AsyncIterable<Type>
  readonly next: (value: Type) => void
  readonly done: () => void

  constructor() {
    this.#nextPromise()
    this.iterable = this.#createIterable()
    this.next = this.#next.bind(this)
    this.done = this.#done.bind(this)
  }

  async *#createIterable() {
    for (let index = 0; ; index++) {
      let value: Type
      try {
        value = await this.#values[index]
      } catch {
        this.#isDone = true
        return
      }
      delete this.#values[index]
      yield value
    }
  }

  #next(value: Type) {
    if (this.#isDone) throw 'already done'
    this.#resolve(value)
    this.#nextPromise()
  }

  #done() {
    if (this.#isDone) throw 'already done'
    this.#reject()
  }

  #nextPromise() {
    const { promise, resolve, reject } = Promise.withResolvers<Type>()
    this.#values.push(promise)
    this.#resolve = resolve
    this.#reject = reject
  }
}

export default class AsyncIterableBuilder<Type> {
  readonly #values: Promise<{ value: Type; done: boolean }>[] = []
  #resolve!: (value: { value: Type; done: boolean }) => void
  readonly iterable: AsyncIterable<Type>
  readonly next: (value: Type, done?: boolean) => void

  constructor() {
    this.#nextPromise()
    this.iterable = this.#createIterable()
    this.next = this.#next.bind(this)
  }

  async *#createIterable() {
    for (let index = 0; ; index++) {
      const { value, done } = await this.#values[index]
      delete this.#values[index]
      yield value
      if (done) return
    }
  }

  #next(value: Type, done: boolean = false) {
    this.#resolve({ value, done })
    this.#nextPromise()
  }

  #nextPromise() {
    this.#values.push(new Promise(resolve => (this.#resolve = resolve)))
  }
}

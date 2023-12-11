export default class AsyncIterableBuilder<Type> {
  readonly #values: Promise<{ value: Type; done: boolean }>[] = []
  #resolve!: (value: { value: Type; done: boolean }) => void
  readonly iterable: AsyncIterable<Type>
  constructor() {
    this.#nextPromise()
    this.iterable = this.#createIterable()
    this.next = this.next.bind(this)
  }
  async *#createIterable() {
    for (let i = 0; ; i++) {
      const { value, done } = await this.#values[i]
      delete this.#values[i]
      yield value
      if (done) return
    }
  }
  next(value: Type, done: boolean = false) {
    this.#resolve({ value, done })
    this.#nextPromise()
  }
  #nextPromise() {
    this.#values.push(new Promise(resolve => (this.#resolve = resolve)))
  }
}

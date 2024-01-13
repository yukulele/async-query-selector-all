// eslint-disable-next-line @typescript-eslint/no-loss-of-precision -- Infinity type hack
type Infinity = 1e999

export type AsyncQuerySelectorType = {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: Infinity,
  ): Promise<HTMLElementTagNameMap[K]>
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: Infinity,
  ): Promise<SVGElementTagNameMap[K]>
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: Infinity,
  ): Promise<MathMLElementTagNameMap[K]>
  /** @deprecated */
  <K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: Infinity,
  ): Promise<HTMLElementDeprecatedTagNameMap[K]>
  <E extends Element = Element>(
    selectors: string,
    parent?: ParentNode,
    timeout?: Infinity,
  ): Promise<E>

  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<HTMLElementTagNameMap[K] | undefined>
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<SVGElementTagNameMap[K] | undefined>
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<MathMLElementTagNameMap[K] | undefined>
  /** @deprecated */
  <K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<HTMLElementDeprecatedTagNameMap[K] | undefined>
  <E extends Element = Element>(
    selectors: string,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<E | undefined>
}

export type AsyncQuerySelectorAllType = {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): AsyncIterable<HTMLElementTagNameMap[K]>
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): AsyncIterable<SVGElementTagNameMap[K]>
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): AsyncIterable<MathMLElementTagNameMap[K]>
  /** @deprecated */
  <K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): AsyncIterable<HTMLElementDeprecatedTagNameMap[K]>
  <E extends Element = Element>(
    selectors: string,
    parent?: ParentNode,
    timeout?: number,
  ): AsyncIterable<E>
}

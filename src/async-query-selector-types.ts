export type AsyncQuerySelectorType = {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<HTMLElementTagNameMap[K]>
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<SVGElementTagNameMap[K]>
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<MathMLElementTagNameMap[K]>
  /** @deprecated */
  <K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<HTMLElementDeprecatedTagNameMap[K]>
  <E extends Element = Element>(
    selectors: string,
    parent?: ParentNode,
    timeout?: number,
  ): Promise<E>
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

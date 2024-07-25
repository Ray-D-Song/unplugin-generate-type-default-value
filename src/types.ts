interface Options {
	/**
	 * Method name used to specify
	 * @default '$d'
	 */
	macroName: string

	/**
	 * glob expressions
   * @default: vue、tsx、ts
	 */
	include: string[]

	/**
	 * glob expressions
	 * @default []
	 */
	exclude: string[]

  framework: Record<string, boolean>

  /**
   * generated default value
   * pass in string like `0` `''` `false` `null` `undefined` `{}`
   */
  values: {
    /**
     * @default `true`
     */
    boolean: string

    /**
     * @default `0`
     */
    number: string

    /**
     * @default `''`
     */
    string: string

    /**
     * @default `null`
     */
    null: string

    /**
     * @default `undefined`
     */
    undefined: string

    /**
     * @default `{}`
     */
    any: string

    /**
     * @default `0n`
     */
    bigint: string

    /**
     * @default `[]`
     */
    array: string

    /**
     * `TSObjectKeyword`
     * @default `{}`
     */
    object: string
  }
}

export type {
  Options,
}
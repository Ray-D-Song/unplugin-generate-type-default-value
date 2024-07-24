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

  /**
   * vue options
   * @default { ref: true, reactive: true }
   */
  vue: {
    ref: boolean
    reactive: boolean
  }
}

export type {
  Options,
}
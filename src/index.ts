import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from './types'
import { createGenerator } from './packages'

export const unpluginFactory: UnpluginFactory<Options|undefined> = (options = {
	macroName: '$d',
	include: ['**/*.vue', '**/*.tsx', '**/*.ts'],
	exclude: [],
  framework: {
    vue: true
  },
  values: {
    boolean: `true`,
    number: `0`,
    string: `''`,
    null: `null`,
    undefined: `undefined`,
    any: `{}`,
    bigint: `0n`,
    array: `[]`,
    object: `{}`,
  }
}) => {
	const { macroName, include, exclude, framework, values } = options
  const frameworkList: string[] = []
  Object.keys(framework).forEach(key => {
    if(framework[key]) 
      frameworkList.push(key)
  })
  const generateDefaultValue = createGenerator(macroName, values, frameworkList)

	return {
		name: 'unplugin-generate-type-default-value',
		enforce: 'pre',
		transformInclude(id) {
			const isInclude = include.some(pattern => minimatch(id, pattern))
			const isExclude = exclude.some(pattern => minimatch(id, pattern))
			if (isInclude && !isExclude)
				return true
			else
				return false
		},
		async transform(raw, id) {
			try {
				return generateDefaultValue(raw)
			}
			catch (e: any) {
				this.error(e)
			}
		},
	}
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

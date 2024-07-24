import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from './types'
import { generateDefaultValue} from './packages'

export const unpluginFactory: UnpluginFactory<Options|undefined> = (options = {
	macroName: '$d',
	include: ['**/*.vue', '**/*.tsx', '**/*.ts'],
	exclude: [],
  vue: {
    ref: true,
    reactive: true
  }
}) => {
	const { macroName, include, exclude, vue: vueOpt } = options

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
				return generateDefaultValue(macroName, raw)
			}
			catch (e: any) {
				this.error(e)
			}
		},
	}
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

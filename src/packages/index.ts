import { babelParse, walkAST } from 'ast-kit'
import { MagicStringAST } from 'magic-string-ast'
import type { TypeCollection } from './infer';
import { inferValue } from './infer'

function generateDefaultValue(macroName: string, raw: string) {
  if(!raw.includes(macroName))
    return raw
  const s = new MagicStringAST(raw)
  const statements = babelParse(raw, 'ts').body.filter(node => JSON.stringify(node).includes(macroName))
  statements.forEach(ast => {
    walkAST(ast, {
      enter(node: any) {
        if(node.type !== 'CallExpression')
          return;
        if(node.callee.name !== macroName)
          return;
        if(!node.typeParameters || node.typeParameters.params.length === 0)
          throw new Error('Type parameter is required')
        if(node.typeParameters.params.length > 1)
          throw new Error('Only one type parameter is allowed')
        const param = node.typeParameters.params[0]
        const value = inferValue(param.type as TypeCollection, param.members, {})
        console.log('value', value)
        s.overwriteNode(node, value)
      },
    })
  })

  return s.toString()
}

export {
  generateDefaultValue
}

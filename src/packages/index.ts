import process from 'node:process'
import { babelParse, walkAST } from 'ast-kit'
import { MagicStringAST } from 'magic-string-ast'
import type { ImportDeclaration, Statement } from '@babel/types'
import type { TypeCollection } from './infer'
import { inferValue } from './infer'

function createGenerator(macroName: string, values: Record<string, string>, framework: string[]) {
  const macroList = [macroName]
  framework.forEach(f => {
    switch(f) {
      case 'vue':
        macroList.push('ref', 'reactive')
    }
  })
  return (raw: string) => {
    const msa = new MagicStringAST(raw)
    macroList.forEach(macro => {
      if(raw.includes(macro)) {
        const blocks: Statement[] = []
        const imports: ImportDeclaration[] = []
        babelParse(raw, 'ts').body.forEach(node => {
          if(JSON.stringify(node).includes(macroName))
            blocks.push(node)
          if(node.type === 'ImportDeclaration')
            imports.push(node)
        })
        console.log(imports[0].source.value)
        console.log('current path:', process.cwd())
        processGenerate(macro, msa, blocks)
      }
    })

    return msa.toString()
  }
}

function processGenerate(macroName: string, MSA: MagicStringAST, statements: Statement[]) {
  statements.forEach(ast => {
    walkAST(ast, {
      // TODO: better type annotation
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
        console.log(param)
        const value = inferValue(param.type as TypeCollection, param.members, {})
        console.log('value', value)
        MSA.overwriteNode(node, value)
      },
    })
  })
}

export {
  createGenerator,
}

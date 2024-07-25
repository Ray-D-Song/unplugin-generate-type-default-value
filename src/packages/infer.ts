import { merge } from 'lodash-es'

type TypeCollection = 'TSStringKeyword' | 'TSNumberKeyword' | 'TSBooleanKeyword' | 
'TSNullKeyword' | 'TSUndefinedKeyword' | 'TSAnyKeyword' | 
'TSBigIntKeyword' | 'TSObjectKeyword' | 'TSUnknownKeyword' | 
'TSNeverKeyword' | 'TSVoidKeyword' | 'TSArrayType' | 
'TSUnionType' | 'TSIntersectionType' | 'TSFunctionType' |
'TSTypeLiteral'

type LiteralOrUndefined<T, K> = T extends 'TSTypeLiteral' ? K: undefined

type Members<T> = LiteralOrUndefined<T, Record<string, any>[]>

type CustomValue<T> = LiteralOrUndefined<T, Record<string, any>>

function inferValue<T extends TypeCollection>(type: T, members: Members<T>, custom: CustomValue<T>) {
  if(type === 'TSTypeLiteral') {
    const obj: Record<string, any> = {}
    members?.forEach(member => {
      obj[member.key.name] = inferValue(member.typeAnnotation.typeAnnotation.type as TypeCollection, member.typeAnnotation.typeAnnotation.members, {})
    })
    return object2Str(merge(obj, custom))
  }

  switch (type) {
    case 'TSStringKeyword':
      return `''`
    case 'TSNumberKeyword':
      return `0`
    case 'TSBooleanKeyword':
      return `false`
    case 'TSNullKeyword':
      return `null`
    case 'TSUndefinedKeyword':
      return `undefined`
    case 'TSAnyKeyword':
      return `{}`
    case 'TSBigIntKeyword':
      return `0n`
    case 'TSObjectKeyword':
      return `{}`
    case 'TSUnknownKeyword':
      return `{}`
    case 'TSNeverKeyword':
      return `{}`
    case 'TSVoidKeyword':
      return `undefined`
    case 'TSArrayType':
      return `[]`

    case 'TSUnionType':
      return `undefined`
    case 'TSIntersectionType':
      return `undefined`
    case 'TSFunctionType':
      return `() => {}`

    default:
      return `''`
  }
}

function object2Str(obj: Record<string, any>) {
  let str = '{'
  Object.keys(obj).forEach(key => {
    str += `${key}: ${obj[key]},`
  })
  str += '}'
  return str
}

export {
  inferValue,
  type TypeCollection,
}
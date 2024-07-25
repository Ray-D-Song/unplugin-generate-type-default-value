import type { Man } from './types'

// const val = $d<{
//   a: string
//   b: number
//   c: {
//     dev: number
//     fun: Function
//   }
// }>()

const man = $d<Man>()

console.log(`man: `, man)

// console.log(val.c.fun)

document.getElementById('app')!.innerHTML = JSON.stringify('bro')

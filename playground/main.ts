const val = $d<{
  a: string
  b: number
  c: {
    dev: number
    fun: Function
  }
}>()

console.log(val.c.fun)

document.getElementById('app')!.innerHTML = JSON.stringify(val)

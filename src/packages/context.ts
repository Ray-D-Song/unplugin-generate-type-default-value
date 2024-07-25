type path = string

class Context {
  imports: Record<path, {
    specifiers: string
  }> = {}
  constructor() {

  }
}
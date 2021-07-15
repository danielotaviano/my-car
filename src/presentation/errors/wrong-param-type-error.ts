export class WrongParamTypeError extends Error {
  constructor (paramName:string, type: string) {
    super(`Wrong param: ${paramName}, it should be a ${type}`)
    this.name = 'MissingParamError'
  }
}

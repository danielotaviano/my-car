export class InvalidParamError extends Error {
  constructor (params: string) {
    super(`invalid params: ${params}`)
    this.name = 'InvalidParamError'
  }
}

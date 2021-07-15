import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { Validation } from '@/presentation/protocols/validation'

export class InvalidFieldValidation implements Validation {
  constructor (
    private readonly fields: string[]
  ) {}

  validate (input: any): Error {
    const entries = Object.keys(input)
    const notValidEntries = entries.filter(entry => !this.fields.includes(entry))

    if (notValidEntries.length > 0) {
      return new InvalidParamError(JSON.stringify(notValidEntries))
    }
  }
}

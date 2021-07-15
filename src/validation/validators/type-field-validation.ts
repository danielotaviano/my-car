import { WrongParamTypeError } from '@/presentation/errors/wrong-param-type-error'
import { Validation } from '@/presentation/protocols/validation'

export class TypeFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly type: any
  ) {}

  validate (input: any): Error {
    if (typeof input[this.fieldName] !== this.type[this.fieldName]) {
      return new WrongParamTypeError(this.fieldName, this.type[this.fieldName])
    }
  }
}

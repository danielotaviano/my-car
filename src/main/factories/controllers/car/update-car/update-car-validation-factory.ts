import { Validation } from '@/presentation/protocols/validation'
import { InvalidFieldValidation } from '@/validation/validators/invalid-field-validation'
import { TypeFieldValidation } from '@/validation/validators/type-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeUpdateCarValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['brand', 'model', 'version', 'year', 'mileage', 'gearbox', 'price']
  const types = {
    brand: 'string',
    model: 'string',
    version: 'string',
    year: 'number',
    mileage: 'number',
    gearbox: 'string',
    price: 'number'
  }
  for (const field of fields) {
    validations.push(new TypeFieldValidation(field, types))
  }
  validations.push(new InvalidFieldValidation(fields))

  return new ValidationComposite(validations)
}

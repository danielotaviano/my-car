import { Validation } from '@/presentation/protocols/validation'
import { InvalidFieldValidation } from '@/validation/validators/invalid-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeListCarValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['brand', 'model', 'version', 'year', 'mileage', 'gearbox', 'price']

  validations.push(new InvalidFieldValidation(fields))

  return new ValidationComposite(validations)
}

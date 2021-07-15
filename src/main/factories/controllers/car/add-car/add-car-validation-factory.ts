import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddCarValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['brand', 'model', 'version', 'year', 'mileage', 'gearbox', 'price']
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

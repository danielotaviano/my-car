import { UpdateCar, UpdateCarModel } from '@/domain/usecases/car'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class UpdateCarController implements Controller {
  constructor(
    private readonly updateCar: UpdateCar,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const {
        brand, gearbox, model, version, mileage, price, year
      }:UpdateCarModel = httpRequest.body

      const { id } = httpRequest.params

      await this.updateCar.update(id, {
        brand, year, price, mileage, version, model, gearbox
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

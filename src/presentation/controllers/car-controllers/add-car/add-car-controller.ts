import { AddCar } from '@/domain/usecases/car'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddCarController implements Controller {
  constructor(
    private readonly addCar: AddCar,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const carData = httpRequest.body

      const error = this.validation.validate(carData)
      if (error) return badRequest(error)

      const savedCar = await this.addCar.add(carData)
      return ok(savedCar)
    } catch (error) {
      return serverError(error)
    }
  }
}

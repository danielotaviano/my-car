import { AddCar } from '@/domain/usecases/car'
import { ok, serverError } from '@/presentation/helpers/http/http.helper'
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
      this.validation.validate(carData)
      const savedCar = await this.addCar.add(carData)
      return ok(savedCar)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { ListCars } from '@/domain/usecases/car'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class ListCarController implements Controller {
  constructor(
    private readonly listCar: ListCars,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) return badRequest(error)

      const cars = await this.listCar.list(httpRequest.query)

      return ok(cars)
    } catch (error) {
      return serverError(error)
    }
  }
}

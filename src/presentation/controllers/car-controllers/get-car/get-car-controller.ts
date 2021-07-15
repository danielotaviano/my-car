import { GetCar } from '@/domain/usecases/car'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { notFound, ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class GetCarController implements Controller {
  constructor(
    private readonly getCar: GetCar
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const car = await this.getCar.get(id)
      if (!car) return notFound(new NotFoundError('car not found'))

      return ok(car)
    } catch (error) {
      return serverError(error)
    }
  }
}

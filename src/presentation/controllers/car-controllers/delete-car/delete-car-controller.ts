import { DeleteCar } from '@/domain/usecases/car'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { noContent, notFound, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class DeleteCarController implements Controller {
  constructor(
    private readonly deleteCar: DeleteCar
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const result = await this.deleteCar.delete(id)
      if (!result) return notFound(new NotFoundError('car not found'))

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

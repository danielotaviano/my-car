import { UpdateCar } from '@/domain/usecases/car'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers/http/http.helper'
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
      const { id } = httpRequest.params

      const updated = await this.updateCar.update(id, httpRequest.body)

      if (!updated) return notFound(new NotFoundError('car not found'))

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

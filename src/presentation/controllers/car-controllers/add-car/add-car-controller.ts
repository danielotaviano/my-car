import { AddCar } from '@/domain/usecases/car'
import { serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddCarController implements Controller {
  constructor(private readonly addCar: AddCar) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const carData = httpRequest.body
      await this.addCar.add(carData)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

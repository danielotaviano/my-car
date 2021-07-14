import { AddCar } from '@/domain/usecases/car'
import { ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddCarController implements Controller {
  constructor(private readonly addCar: AddCar) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const carData = httpRequest.body
      const savedCar = await this.addCar.add(carData)
      return ok(savedCar)
    } catch (error) {
      return serverError(error)
    }
  }
}

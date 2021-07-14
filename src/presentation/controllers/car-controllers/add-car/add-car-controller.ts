import { AddCar } from '@/domain/usecases/car'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddCarController implements Controller {
  constructor(private readonly addCar: AddCar) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const carData = httpRequest.body
    await this.addCar.add(carData)
    return null
  }
}

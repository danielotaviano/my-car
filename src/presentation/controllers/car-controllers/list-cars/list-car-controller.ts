import { ListCarModel, ListCars } from '@/domain/usecases/car'
import { ok, serverError } from '@/presentation/helpers/http/http.helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class ListCarController implements Controller {
  constructor(
    private readonly listCar: ListCars
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const castedData = this.mapQueryFields(httpRequest.query)
      const cars = await this.listCar.list(castedData)

      return ok(cars)
    } catch (error) {
      return serverError(error)
    }
  }

  private mapQueryFields(query: ListCarModel): ListCarModel {
    const fildsToNumber = ['maxPrice', 'minPrice', 'mileage', 'maxYear', 'minYear']
    const convertedFields = Object.keys(query).reduce((crr, key) => {
      if (fildsToNumber.includes(key)) {
        crr[key] = Number(query[key])
        return crr
      }
      crr[key] = query[key]
      return crr
    }, {})
    return convertedFields
  }
}

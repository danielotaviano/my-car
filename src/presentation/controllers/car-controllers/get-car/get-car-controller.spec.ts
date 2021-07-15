import { CarModel } from '@/domain/models/car'
import { GetCar } from '@/domain/usecases/car'
import { ServerError } from '@/presentation/errors/server-error'
import { ok } from '@/presentation/helpers/http/http.helper'
import { GetCarController } from './get-car-controller'

const makeFakeCarWithId = () => {
  const fakeCar = {
    id: 'valid_id',
    brand: 'any_brand',
    model: 'any_model',
    version: 'any_version',
    year: 2000,
    mileage: 10000,
    gearbox: 'valid_gear_box',
    price: 50000
  }

  return fakeCar
}

const makeGetCar = () => {
  class GetCarStub implements GetCar {
    async get(carId: string): Promise<CarModel> {
      return new Promise(resolve => resolve(makeFakeCarWithId()))
    }
  }

  return new GetCarStub()
}

type SutTypes = {
  sut: GetCarController,
  getCarStub: GetCar
}

const makeSut = (): SutTypes => {
  const getCarStub = makeGetCar()
  const sut = new GetCarController(getCarStub)

  return {
    sut,
    getCarStub
  }
}

describe('AddCar Controller', () => {
  test('should call UpdateCar with correct values', async () => {
    const { sut, getCarStub } = makeSut()
    const updateSpy = jest.spyOn(getCarStub, 'get')
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toBeCalledWith(httpRequest.params.id)
  })

  test('should return 500 if UpdateCar throws', async () => {
    const { sut, getCarStub } = makeSut()
    jest.spyOn(getCarStub, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toEqual(ok(makeFakeCarWithId()))
  })
})

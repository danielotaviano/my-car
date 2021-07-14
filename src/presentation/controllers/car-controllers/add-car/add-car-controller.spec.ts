import { CarModel } from '@/domain/models/car'
import { AddCar, AddCarModel } from '@/domain/usecases/car'
import { ServerError } from '@/presentation/errors/server-error'
import { ok } from '@/presentation/helpers/http/http.helper'
import { AddCarController } from './add-car-controller'

const makeAddCar = () => {
  class AddCarStub implements AddCar {
    async add(car: AddCarModel): Promise<CarModel> {
      const fakeCar = {
        id: 'any_id',
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      }
      return new Promise(resolve => resolve(fakeCar))
    }
  }

  return new AddCarStub()
}

type SutTypes = {
  sut: AddCarController,
  addCarStub: AddCar
}

const makeSut = (): SutTypes => {
  const addCarStub = makeAddCar()
  const sut = new AddCarController(addCarStub)

  return {
    sut,
    addCarStub
  }
}

describe('AddCar Controller', () => {
  test('should call AddCar with correct values', async () => {
    const { sut, addCarStub } = makeSut()
    const addSpy = jest.spyOn(addCarStub, 'add')
    const httpRequest = {
      body: {
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toBeCalledWith(httpRequest.body)
  })

  test('should return 500 if AddCar throws', async () => {
    const { sut, addCarStub } = makeSut()
    jest.spyOn(addCarStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      brand: 'any_brand',
      model: 'any_model',
      version: 'any_version',
      year: 2000,
      mileage: 10000,
      gearbox: 'valid_gear_box',
      price: 50000
    }))
  })
})

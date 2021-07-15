import { CarModel } from '@/domain/models/car'
import { ListCarModel, ListCars } from '@/domain/usecases/car'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, ok } from '@/presentation/helpers/http/http.helper'
import { Validation } from '@/presentation/protocols/validation'
import { ListCarController } from './list-car-controller'

const makeFakeCar = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
})

const makeFakeCarWithId = () => ({
  id: 'any_id',
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
})

const makeListCar = () => {
  class ListCarStub implements ListCars {
    async list(filters: ListCarModel): Promise<CarModel[]> {
      const cars = [makeFakeCarWithId()]
      return new Promise(resolve => resolve(cars))
    }
  }

  return new ListCarStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ListCarController,
  listCarStub: ListCars
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const listCarStub = makeListCar()
  const validationStub = makeValidation()
  const sut = new ListCarController(listCarStub, validationStub)

  return {
    sut,
    listCarStub,
    validationStub
  }
}

describe('AddCar Controller', () => {
  test('should call ListCar with correct values', async () => {
    const { sut, listCarStub } = makeSut()
    const updateSpy = jest.spyOn(listCarStub, 'list')
    const httpRequest = {
      query: {
        brand: 'any',
        maxPrice: 10000,
        minPrice: 5000
      }
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toBeCalledWith(httpRequest.query)
  })

  test('should return 500 if ListCar throws', async () => {
    const { sut, listCarStub } = makeSut()
    jest.spyOn(listCarStub, 'list').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      query: makeFakeCar()
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toBeCalledWith(makeFakeCar())
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new MissingParamError('any_field')
    )
    const httpRequest = {
      query: makeFakeCar()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: { brand: 'any_id' }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toEqual(ok([makeFakeCarWithId()]))
  })
})

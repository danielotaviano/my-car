import { CarModel } from '@/domain/models/car'
import { AddCar, AddCarModel } from '@/domain/usecases/car'
import { ServerError } from '@/presentation/errors/server-error'
import { ok } from '@/presentation/helpers/http/http.helper'
import { Validation } from '@/presentation/protocols/validation'
import { AddCarController } from './add-car-controller'

const makeFakeCar = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
})

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

const makeAddCar = () => {
  class AddCarStub implements AddCar {
    async add(car: AddCarModel): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }

  return new AddCarStub()
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
  sut: AddCarController,
  addCarStub: AddCar
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addCarStub = makeAddCar()
  const validationStub = makeValidation()
  const sut = new AddCarController(addCarStub, validationStub)

  return {
    sut,
    addCarStub,
    validationStub
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
      body: makeFakeCar()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toEqual(ok(makeFakeCarWithId()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: makeFakeCar()
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toBeCalledWith(makeFakeCar())
  })
})

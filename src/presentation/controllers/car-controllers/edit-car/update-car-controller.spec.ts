import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { UpdateCar, UpdateCarModel } from '@/domain/usecases/car'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, noContent } from '@/presentation/helpers/http/http.helper'
import { Validation } from '@/presentation/protocols/validation'
import { UpdateCarController } from './update-car-controller'

const makeFakeCar = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
})

const makeUpdateCar = () => {
  class UpdateCarStub implements UpdateCar {
    async update(carId: string, carData: UpdateCarModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateCarStub()
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
  sut: UpdateCarController,
  updateCarStub: UpdateCarRepository
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateCarStub = makeUpdateCar()
  const validationStub = makeValidation()
  const sut = new UpdateCarController(updateCarStub, validationStub)

  return {
    sut,
    updateCarStub,
    validationStub
  }
}

describe('AddCar Controller', () => {
  test('should call UpdateCar with correct values', async () => {
    const { sut, updateCarStub } = makeSut()
    const updateSpy = jest.spyOn(updateCarStub, 'update')
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      body: makeFakeCar()
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toBeCalledWith(httpRequest.params.id, httpRequest.body)
  })

  test('should return 500 if UpdateCar throws', async () => {
    const { sut, updateCarStub } = makeSut()
    jest.spyOn(updateCarStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      params: {
        id: 'any_id'
      },
      body: makeFakeCar()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      body: makeFakeCar()
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
      params: {
        id: 'any_id'
      },
      body: makeFakeCar()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      body: makeFakeCar()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse).toEqual(noContent())
  })
})

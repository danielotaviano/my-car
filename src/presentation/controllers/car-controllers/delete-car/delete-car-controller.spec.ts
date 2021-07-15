import { DeleteCar } from '@/domain/usecases/car'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { ServerError } from '@/presentation/errors/server-error'
import { noContent, notFound } from '@/presentation/helpers/http/http.helper'
import { DeleteCarController } from './delete-car-controller'

const makeDeleteCar = () => {
  class DeleteCarStub implements DeleteCar {
    async delete(carId: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new DeleteCarStub()
}

type SutTypes = {
  sut: DeleteCarController,
  deleteCarStub: DeleteCar
}

const makeSut = (): SutTypes => {
  const deleteCarStub = makeDeleteCar()
  const sut = new DeleteCarController(deleteCarStub)

  return {
    sut,
    deleteCarStub
  }
}

describe('AddCar Controller', () => {
  test('should call UpdateCar with correct values', async () => {
    const { sut, deleteCarStub } = makeSut()
    const updateSpy = jest.spyOn(deleteCarStub, 'delete')
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toBeCalledWith(httpRequest.params.id)
  })

  test('should return 500 if UpdateCar throws', async () => {
    const { sut, deleteCarStub } = makeSut()
    jest.spyOn(deleteCarStub, 'delete').mockImplementationOnce(async () => {
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

  test('should return 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 404 if DeleteCar return null', async () => {
    const { sut, deleteCarStub } = makeSut()
    jest.spyOn(deleteCarStub, 'delete').mockReturnValueOnce(null)
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse).toEqual(notFound(new NotFoundError('car not found')))
  })
})

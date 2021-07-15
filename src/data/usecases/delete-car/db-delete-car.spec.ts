import { DeleteCarRepository } from '@/data/protocols/db/delete-car-repository'
import { CarModel } from '@/domain/models/car'
import { DbDeleteCar } from './db-delete-car'

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

const makeDeleteCarRepository = (): DeleteCarRepository => {
  class DeleteCarRepositoryStub implements DeleteCarRepository {
    async delete(id: string): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new DeleteCarRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteCar
  deleteCarRepositoryStub: DeleteCarRepository
}

const makeSut = (): SutTypes => {
  const deleteCarRepositoryStub = makeDeleteCarRepository()
  const sut = new DbDeleteCar(deleteCarRepositoryStub)

  return {
    sut,
    deleteCarRepositoryStub
  }
}

describe('DbDeleteCar UseCase', () => {
  test('should call DeleteCarRepository with correct values', async () => {
    const { sut, deleteCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(deleteCarRepositoryStub, 'delete')
    const carData = 'any_id'

    await sut.delete(carData)
    expect(addSpy).toHaveBeenCalledWith(carData)
  })
  test('should throw if DeleteCarRepository throws', async () => {
    const { sut, deleteCarRepositoryStub } = makeSut()

    jest.spyOn(deleteCarRepositoryStub, 'delete').mockRejectedValueOnce(new Error())
    const carData = 'any_id'

    const promise = sut.delete(carData)
    await expect(promise).rejects.toThrow()
  })
})

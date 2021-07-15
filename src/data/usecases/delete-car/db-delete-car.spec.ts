import { DeleteCarRepository } from '@/data/protocols/db/delete-car-repository'
import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
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

const makeGetCarRepository = (): GetCarRepository => {
  class GetCarRepositoryStub implements GetCarRepository {
    async get(id: string): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new GetCarRepositoryStub()
}

const makeDeleteCarRepository = (): DeleteCarRepository => {
  class DeleteCarRepositoryStub implements DeleteCarRepository {
    async delete(id: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteCarRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteCar
  deleteCarRepositoryStub: DeleteCarRepository,
  getCarRepositoryStub: GetCarRepository
}

const makeSut = (): SutTypes => {
  const getCarRepositoryStub = makeGetCarRepository()
  const deleteCarRepositoryStub = makeDeleteCarRepository()
  const sut = new DbDeleteCar(deleteCarRepositoryStub, getCarRepositoryStub)

  return {
    sut,
    deleteCarRepositoryStub,
    getCarRepositoryStub
  }
}

describe('DbDeleteCar UseCase', () => {
  test('should return null if GetCarRepository returns null', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    jest.spyOn(getCarRepositoryStub, 'get').mockReturnValueOnce(null)
    const carId = 'any_id'
    const cars = await sut.delete(carId)
    expect(cars).toBeNull()
  })
  test('should call GetCarRepository with correct values', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    const getSpy = jest.spyOn(getCarRepositoryStub, 'get')
    const carId = 'any_id'
    await sut.delete(carId)
    expect(getSpy).toBeCalledWith(carId)
  })
  test('should throw if GetCarRepository throws', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    jest.spyOn(getCarRepositoryStub, 'get').mockRejectedValueOnce(new Error())
    const carData = 'any_id'

    const promise = sut.delete(carData)
    await expect(promise).rejects.toThrow()
  })
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
  test('should not throw on success', async () => {
    const { sut } = makeSut()

    const carData = 'any_id'

    const promise = sut.delete(carData)
    await expect(promise).resolves.not.toThrow()
  })
})

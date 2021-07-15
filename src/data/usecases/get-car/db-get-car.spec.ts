import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { CarModel } from '@/domain/models/car'
import { DbGetCar } from './db-get-car'

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

type SutTypes = {
  sut: DbGetCar
  getCarRepositoryStub: GetCarRepository
}

const makeSut = (): SutTypes => {
  const getCarRepositoryStub = makeGetCarRepository()
  const sut = new DbGetCar(getCarRepositoryStub)

  return {
    sut,
    getCarRepositoryStub
  }
}

describe('DbGetCar UseCase', () => {
  test('should call GetCarRepository with correct values', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(getCarRepositoryStub, 'get')
    const carData = 'any_id'

    await sut.get(carData)
    expect(addSpy).toHaveBeenCalledWith(carData)
  })
})

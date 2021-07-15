import { ListCarRepository } from '@/data/protocols/db/list-car-repository'
import { CarModel } from '@/domain/models/car'
import { ListCarModel } from '@/domain/usecases/car'
import { DbListCar } from './db-list-car'

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

const makeFakeFilters = () => ({
  brand: 'any_brand',
  minYear: 2010
})

const makeListCarRepository = (): ListCarRepository => {
  class ListCarRepositoryStub implements ListCarRepository {
    async list(filters: ListCarModel): Promise<CarModel[]> {
      const fakeCar = [makeFakeCarWithId()]
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new ListCarRepositoryStub()
}

type SutTypes = {
  sut: DbListCar
  listCarRepositoryStub: ListCarRepository
}

const makeSut = (): SutTypes => {
  const listCarRepositoryStub = makeListCarRepository()
  const sut = new DbListCar(listCarRepositoryStub)

  return {
    sut,
    listCarRepositoryStub
  }
}

describe('DbListCar UseCase', () => {
  test('should call ListCarRepository with correct values', async () => {
    const { sut, listCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(listCarRepositoryStub, 'list')
    const carData = makeFakeFilters()

    await sut.list(carData)
    expect(addSpy).toHaveBeenCalledWith(carData)
  })
})

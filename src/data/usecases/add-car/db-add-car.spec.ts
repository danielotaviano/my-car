import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCarModel } from '@/domain/usecases/car'
import { DbAddCar } from './db-add-car'

const makeAddCarRepository = (): AddCarRepository => {
  class AddAccountRepositoryStub implements AddCarRepository {
    async add(account: AddCarModel): Promise<CarModel> {
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
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new AddAccountRepositoryStub()
}

type SutTypes = {
  sut: DbAddCar
  addCarRepositoryStub: AddCarRepository
}

const makeSut = (): SutTypes => {
  const addCarRepositoryStub = makeAddCarRepository()
  const sut = new DbAddCar(addCarRepositoryStub)

  return {
    sut,
    addCarRepositoryStub
  }
}

describe('DbAddCar UseCase', () => {
  test('should call AddCarRepository with correct values', async () => {
    const { sut, addCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addCarRepositoryStub, 'add')
    const carData = {
      brand: 'any_brand',
      model: 'any_model',
      version: 'any_version',
      year: 2000,
      mileage: 10000,
      gearbox: 'valid_gear_box',
      price: 50000
    }

    await sut.add(carData)
    expect(addSpy).toHaveBeenCalledWith(carData)
  })
})

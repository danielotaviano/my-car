import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { CarModel } from '@/domain/models/car'
import { UpdateCarModel } from '@/domain/usecases/car'
import { DbUpdateCar } from './db-update-car'

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

const makeFakeCar = () => {
  const fakeCar = {
    brand: 'any_brand',
    model: 'any_model',
    version: 'any_version',
    price: 50000
  }

  return fakeCar
}

const makeAddUpdateCarRepository = (): UpdateCarRepository => {
  class UpdateCarRepositoryStub implements UpdateCarRepository {
    async update(carId: string, carData: UpdateCarModel): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new UpdateCarRepositoryStub()
}

type SutTypes = {
  sut: DbUpdateCar
  updateCarRepositoryStub: UpdateCarRepository
}

const makeSut = (): SutTypes => {
  const updateCarRepositoryStub = makeAddUpdateCarRepository()
  const sut = new DbUpdateCar(updateCarRepositoryStub)

  return {
    sut,
    updateCarRepositoryStub
  }
}

describe('DbUpdateCar UseCase', () => {
  test('should call UpdateCarRepository with correct values', async () => {
    const { sut, updateCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(updateCarRepositoryStub, 'update')
    const carId = 'any_id'
    const carData = makeFakeCar()

    await sut.update(carId, carData)
    expect(addSpy).toHaveBeenCalledWith(carId, carData)
  })
})

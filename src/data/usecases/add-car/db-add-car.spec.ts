import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCarModel } from '@/domain/usecases/car'
import { DbAddCar } from './db-add-car'

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
    year: 2000,
    mileage: 10000,
    gearbox: 'valid_gear_box',
    price: 50000
  }

  return fakeCar
}

const makeAddCarRepository = (): AddCarRepository => {
  class AddCarRepositoryStub implements AddCarRepository {
    async add(car: AddCarModel): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new AddCarRepositoryStub()
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
    const carData = makeFakeCar()

    await sut.add(carData)
    expect(addSpy).toHaveBeenCalledWith(carData)
  })
  test('should throw if AddCarRepository throws', async () => {
    const { sut, addCarRepositoryStub } = makeSut()

    jest.spyOn(addCarRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) =>
        reject(new Error()))
    )
    const carData = {
      brand: 'any_brand',
      model: 'any_model',
      version: 'any_version',
      year: 2000,
      mileage: 10000,
      gearbox: 'valid_gear_box',
      price: 50000
    }

    const promise = sut.add(carData)
    await expect(promise).rejects.toThrow()
  })
  test('should return a car on success', async () => {
    const { sut } = makeSut()
    const carData = makeFakeCar()

    const car = await sut.add(carData)
    expect(car).toEqual(makeFakeCarWithId())
  })
})

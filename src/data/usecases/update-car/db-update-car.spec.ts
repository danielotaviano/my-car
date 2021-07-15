import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
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

const makeGetCarRepository = (): GetCarRepository => {
  class GetCarRepositoryStub implements GetCarRepository {
    async get(id: string): Promise<CarModel> {
      const fakeCar = makeFakeCarWithId()
      return new Promise(resolve => resolve(fakeCar))
    }
  }
  return new GetCarRepositoryStub()
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
  getCarRepositoryStub: GetCarRepository
}

const makeSut = (): SutTypes => {
  const updateCarRepositoryStub = makeAddUpdateCarRepository()
  const getCarRepositoryStub = makeGetCarRepository()
  const sut = new DbUpdateCar(updateCarRepositoryStub, getCarRepositoryStub)

  return {
    sut,
    updateCarRepositoryStub,
    getCarRepositoryStub
  }
}

describe('DbUpdateCar UseCase', () => {
  test('should return null if GetCarRepository returns null', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    jest.spyOn(getCarRepositoryStub, 'get').mockReturnValueOnce(null)
    const carId = 'any_id'
    const carData = makeFakeCar()

    const cars = await sut.update(carId, carData)
    expect(cars).toBeNull()
  })
  test('should call GetCarRepository with correct values', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    const getSpy = jest.spyOn(getCarRepositoryStub, 'get')
    const carId = 'any_id'
    const carData = makeFakeCar()
    await sut.update(carId, carData)
    expect(getSpy).toBeCalledWith(carId)
  })
  test('should throw if GetCarRepository throws', async () => {
    const { sut, getCarRepositoryStub } = makeSut()

    jest.spyOn(getCarRepositoryStub, 'get').mockRejectedValueOnce(new Error())
    const carId = 'any_id'
    const carData = makeFakeCar()
    const promise = sut.update(carId, carData)
    await expect(promise).rejects.toThrow()
  })
  test('should call UpdateCarRepository with correct values', async () => {
    const { sut, updateCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(updateCarRepositoryStub, 'update')
    const carId = 'any_id'
    const carData = makeFakeCar()

    await sut.update(carId, carData)
    expect(addSpy).toHaveBeenCalledWith(carId, carData)
  })
  test('should throw if UpdateCarRepository throws', async () => {
    const { sut, updateCarRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(updateCarRepositoryStub, 'update')
    const carId = 'any_id'
    const carData = makeFakeCar()

    await sut.update(carId, carData)
    expect(addSpy).toHaveBeenCalledWith(carId, carData)
  })
  test('should return updatedCar on success', async () => {
    const { sut } = makeSut()
    const carId = 'any_id'
    const carData = makeFakeCar()

    const car = await sut.update(carId, carData)
    expect(car).toEqual(makeFakeCarWithId())
  })
})

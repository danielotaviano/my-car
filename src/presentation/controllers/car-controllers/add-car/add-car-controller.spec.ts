import { CarModel } from '@/domain/models/car'
import { AddCar, AddCarModel } from '@/domain/usecases/car'
import { AddCarController } from './add-car-controller'

const makeAddCar = () => {
  class AddCarStub implements AddCar {
    async add(car: AddCarModel): Promise<CarModel> {
      const fakeCar = {
        id: 'any_id',
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

  return new AddCarStub()
}

type SutTypes = {
  sut: AddCarController,
  addCarStub: AddCar
}

const makeSut = (): SutTypes => {
  const addCarStub = makeAddCar()
  const sut = new AddCarController(addCarStub)

  return {
    sut,
    addCarStub
  }
}

describe('AddCar Controller', () => {
  test('should call AddCar with correct values', async () => {
    const { sut, addCarStub } = makeSut()
    const addSpy = jest.spyOn(addCarStub, 'add')
    const httpRequest = {
      body: {
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toBeCalledWith(httpRequest.body)
  })
})

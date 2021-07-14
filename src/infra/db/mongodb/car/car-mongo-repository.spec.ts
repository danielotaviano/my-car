import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper } from '../helpers/mongo-helper'
import { CarMongoRepository } from './car-mongo-repository'

let carCollection: Collection

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

const makeSut = (): CarMongoRepository => {
  return new CarMongoRepository()
}

describe('Car Mongo Repository', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    await mongod.stop()
  })

  beforeEach(async () => {
    carCollection = await MongoHelper.getCollection('cars')
    await carCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should return a car on add success', async () => {
      const sut = makeSut()
      const fakeCar = makeFakeCar()
      const car = await sut.add(fakeCar)

      expect(car).toBeTruthy()
      expect(car.id).toBeTruthy()
      expect(car.brand).toBe(fakeCar.brand)
      expect(car.gearbox).toBe(fakeCar.gearbox)
      expect(car.mileage).toBe(fakeCar.mileage)
      expect(car.model).toBe(fakeCar.model)
      expect(car.price).toBe(fakeCar.price)
      expect(car.version).toBe(fakeCar.version)
      expect(car.year).toBe(fakeCar.year)
    })
  })
})

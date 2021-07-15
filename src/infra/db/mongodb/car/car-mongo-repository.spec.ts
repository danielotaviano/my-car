/* eslint-disable jest/expect-expect */

import { CarModel } from '@/domain/models/car'
import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper } from '../helpers/mongo-helper'
import { CarMongoRepository } from './car-mongo-repository'

let carCollection: Collection<CarModel>

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

      const isExists = await carCollection.findOne({ _id: car.id })

      expect(isExists).toBeTruthy()
    })
  })
  describe('delete()', () => {
    test('should delete a car on success', async () => {
      const sut = makeSut()
      const fakeCar = makeFakeCar()
      const car = await sut.add(fakeCar)

      const result = await carCollection.findOne({ _id: car.id })

      expect(result).toBeTruthy()

      await sut.delete(car.id)

      const nextResult = await carCollection.findOne({ _id: car.id })
      expect(nextResult).toBeFalsy()
    })
  })

  describe('update()', () => {
    test('should update a car on success', async () => {
      const sut = makeSut()
      const fakeCar = makeFakeCar()
      const car = await sut.add(fakeCar)

      expect(car.model).toEqual(fakeCar.model)

      await sut.update(car.id, { model: 'newModel' })

      const updated = await carCollection.findOne({ _id: car.id })

      expect(updated.model).toEqual('newModel')
      expect(updated.year).toEqual(car.year)
    })
  })

  describe('get()', () => {
    test('should return a car on success', async () => {
      const sut = makeSut()
      const fakeCar = makeFakeCar()
      const car = await sut.add(fakeCar)

      const result = await carCollection.findOne({ _id: car.id })
      const resultBySut = await sut.get(car.id)

      expect(result).toBeTruthy()
      expect(resultBySut).toBeTruthy()

      await carCollection.deleteOne({ _id: car.id })

      const resultBySutNext = await sut.get(car.id)

      expect(resultBySutNext).toBeFalsy()
    })
  })
})

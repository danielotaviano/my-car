/* eslint-disable jest/expect-expect */

import { CarModel } from '@/domain/models/car'
import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper } from '../helpers/mongo-helper'
import { CarMongoRepository } from './car-mongo-repository'

let carCollection: Collection<Partial<CarModel>>

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

  describe('list()', () => {
    test('should return a list of cars', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const cars = await sut.list({})
      expect(cars).toEqual(expect.arrayContaining(
        [expect.objectContaining(makeFakeCar1()), expect.objectContaining(makeFakeCar2())]
      ))
    })
    test('[brand] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const cars = await sut.list({ brand: '2' })
      expect(cars).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
    })

    test('[model] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const cars = await sut.list({ model: '2' })
      expect(cars).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
    })
    test('[version] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version123',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const cars = await sut.list({ version: '123' })
      expect(cars).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar1())]))
    })
    test('[year] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const car1Result = await sut.list({ minYear: 100, maxYear: 2005 })
      const car2Result = await sut.list({ minYear: 2005, maxYear: 30000 })
      expect(car1Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar1())]))
      expect(car2Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
    })
    test('[mileage] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const car1Result = await sut.list({ mileage: 100002 })
      expect(car1Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
    })
    test('[gearbox] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 50000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 500002
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const car1Result = await sut.list({ gearbox: '2' })
      expect(car1Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
    })
    test('[price] should return a list of cars that has filter', async () => {
      const sut = makeSut()
      const makeFakeCar1 = () => ({
        brand: 'any_brand',
        model: 'any_model',
        version: 'any_version',
        year: 2000,
        mileage: 10000,
        gearbox: 'valid_gear_box',
        price: 25000
      })
      const makeFakeCar2 = () => ({
        brand: 'any_brand2',
        model: 'any_model2',
        version: 'any_version2',
        year: 20002,
        mileage: 100002,
        gearbox: 'valid_gear_box2',
        price: 50000
      })
      await carCollection.insertMany([makeFakeCar2(), makeFakeCar1()])

      const car1Result = await sut.list({ minPrice: 10000, maxPrice: 30000 })
      const car2Result = await sut.list({ minPrice: 30000, maxPrice: 60000 })
      expect(car2Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar2())]))
      expect(car1Result).toEqual(expect.arrayContaining([expect.objectContaining(makeFakeCar1())]))
    })
  })
})

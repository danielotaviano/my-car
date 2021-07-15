
/* eslint-disable jest/expect-expect */
import { Collection, ObjectId } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let carCollection: Collection

const makeFakeCar = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
})

const makeFakeWrongCar = () => ({
  brand: 'any_brand',
  model: 1200,
  version: 'any_version',
  year: '2000',
  mileage: true,
  gearbox: 'valid_gear_box',
  price: 50000
})

const makeFakeWrongCarWithInvalidFields = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000,
  any_field_wrong: 'any_value'
})

describe('AddCar Routes', () => {
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

  describe('POST /car', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/car')
        .send(makeFakeCar())
        .expect(200)
        .expect(res => {
          expect(res.body).toBeTruthy()
          expect(res.body.id).toBeTruthy()
          expect(res.body.model).toEqual('any_model')
          expect(res.body.version).toEqual('any_version')
          expect(res.body.brand).toEqual('any_brand')
          expect(res.body.year).toEqual(2000)
          expect(res.body.mileage).toEqual(10000)
          expect(res.body.gearbox).toEqual('valid_gear_box')
          expect(res.body.price).toEqual(50000)
        })
    })

    test('Should return 400 if wrong types of fields are provided', async () => {
      await request(app)
        .post('/api/car')
        .send(makeFakeWrongCar())
        .expect(400)
    })
  })

  describe('PUT /car', () => {
    test('Should return 204 on success', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      const result = await carCollection.insertOne(makeFakeCar())
      const id = result.ops[0]._id
      await request(app)
        .put(`/api/car/${id}`)
        .send({ brand: 'newBrand' })
        .expect(204)

      const nextResult = await carCollection.findOne({ _id: new ObjectId(id) })

      expect(nextResult.brand).toEqual('newBrand')
      expect(nextResult.version).toEqual(makeFakeCar().version)
    })

    test('Should return 400 if wrong types of fields are provided', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      const result = await carCollection.insertOne(makeFakeCar())
      const id = result.ops[0]._id
      await request(app)
        .put(`/api/car/${id}`)
        .send(makeFakeWrongCar())
        .expect(400)
    })

    test('Should return 400 if invalid types of fields are provided', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      const result = await carCollection.insertOne(makeFakeCar())
      const id = result.ops[0]._id
      await request(app)
        .put(`/api/car/${id}`)
        .send(makeFakeWrongCarWithInvalidFields())
        .expect(400)
    })
  })

  describe('GET /car', () => {
    test('Should return 200 on success', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      await carCollection.insertOne(makeFakeCar())
      await request(app)
        .get('/api/car')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1)
        })
    })

    test('Should return a filtered car', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      await carCollection.insertOne(makeFakeCar())
      await carCollection.insertOne(Object.assign(makeFakeCar(), { brand: 'marca' }))
      await request(app)
        .get('/api/car?brand=marca')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1)
          expect(res.body[0].brand).toEqual('marca')
        })
    })
  })
  describe('GET /car/:id', () => {
    test('Should return 200 on success', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      const result = await carCollection.insertOne(makeFakeCar())
      const car = MongoHelper.map(result.ops[0])
      await request(app)
        .get(`/api/car/${car.id}`)
        .expect(200)
        .expect(res => {
          expect(String(res.body.id)).toEqual(String(car.id))
          expect(res.body).toEqual(expect.objectContaining(makeFakeCar()))
        })
    })

    test('Should return a filtered car', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      await carCollection.insertOne(makeFakeCar())
      await carCollection.insertOne(Object.assign(makeFakeCar(), { brand: 'marca' }))
      await request(app)
        .get('/api/car?brand=marca')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1)
          expect(res.body[0].brand).toEqual('marca')
        })
    })
  })
  describe('DELETE /car/:id', () => {
    test('Should return 200 on success', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      const result = await carCollection.insertOne(makeFakeCar())
      const car = MongoHelper.map(result.ops[0])

      const findCar = await carCollection.findOne({ _id: car.id })
      expect(findCar).toBeTruthy()

      await request(app)
        .delete(`/api/car/${car.id}`)
        .expect(204)

      const findCarAfterDelete = await carCollection.findOne({ _id: car.id })
      expect(findCarAfterDelete).toBeFalsy()
    })

    test('Should return a filtered car', async () => {
      const carCollection = await MongoHelper.getCollection('cars')
      await carCollection.insertOne(makeFakeCar())
      await carCollection.insertOne(Object.assign(makeFakeCar(), { brand: 'marca' }))
      await request(app)
        .get('/api/car?brand=marca')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1)
          expect(res.body[0].brand).toEqual('marca')
        })
    })
  })
})

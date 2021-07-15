
/* eslint-disable jest/expect-expect */
import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection

const makeFakeCar = () => ({
  brand: 'any_brand',
  model: 'any_model',
  version: 'any_version',
  year: 2000,
  mileage: 10000,
  gearbox: 'valid_gear_box',
  price: 50000
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
    accountCollection = await MongoHelper.getCollection('cars')
    await accountCollection.deleteMany({})
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
  })
})
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper, MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await sut.connect(uri)
  })
  afterAll(async () => {
    await sut.disconnect()
    await mongod.stop()
  })

  test('Should reconnect if mongodb is down', async () => {
    let carCollection = await sut.getCollection('cars')

    expect(carCollection).toBeTruthy()

    await sut.disconnect()

    carCollection = await sut.getCollection('cars')

    expect(carCollection).toBeTruthy()
  })

  test('Should return when use map with falsy value', async () => {
    const result = null

    const collection = MongoHelper.map(result)
    expect(collection).toBeFalsy()
  })
})

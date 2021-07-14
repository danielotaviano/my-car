import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper as sut } from './mongo-helper'

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
    let accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()
  })
})

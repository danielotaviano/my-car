import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCarModel } from '@/domain/usecases/car'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class CarMongoRepository implements AddCarRepository {
  async add(carData: AddCarModel): Promise<CarModel> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    const car = await carCollection.insertOne(carData)
    return MongoHelper.map(car.ops[0])
  }
}

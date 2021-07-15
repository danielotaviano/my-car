import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { DeleteCarRepository } from '@/data/protocols/db/delete-car-repository'
import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { ListCarRepository } from '@/data/protocols/db/list-car-repository'
import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCarModel, ListCarModel, UpdateCarModel } from '@/domain/usecases/car'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class CarMongoRepository
implements
  AddCarRepository,
  DeleteCarRepository,
  GetCarRepository,
  ListCarRepository,
  UpdateCarRepository {
  async add(carData: AddCarModel): Promise<CarModel> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    const car = await carCollection.insertOne(carData)
    return MongoHelper.map(car.ops[0])
  }

  async delete(carId: string): Promise<void> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    await carCollection.deleteOne({ _id: carId })
  }

  async get(carId: string): Promise<CarModel> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    const result = await carCollection.findOne({ _id: carId })
    return result ? MongoHelper.map(result) : null
  }

  async list(filters?: ListCarModel): Promise<CarModel[]> {
    const carCollection: Collection<CarModel> = await MongoHelper.getCollection('cars')

    const query: any = {}

    if (filters?.brand) {
      query.brand = { $regex: filters.brand, $options: 'i' }
    }

    if (filters?.gearbox) {
      query.gearbox = { $regex: filters.gearbox, $options: 'i' }
    }

    if (filters?.mileage) {
      query.mileage = filters?.mileage
    }

    if (filters?.model) {
      query.model = { $regex: filters.model, $options: 'i' }
    }

    if (filters?.version) {
      query.version = { $regex: filters.version, $options: 'i' }
    }

    if (filters?.maxPrice && filters?.minPrice) {
      query.price = { $gte: filters?.minPrice, $lte: filters?.maxPrice }
    }

    if (filters?.maxYear && filters?.minYear) {
      query.year = { $gte: filters?.minYear, $lte: filters?.maxYear }
    }

    const result = await carCollection.find(query).toArray()
    return result
  }

  async update(carId: string, carData: UpdateCarModel): Promise<void> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    await carCollection.updateOne({ _id: carId }, { $set: carData })
  }
}

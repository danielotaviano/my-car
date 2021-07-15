import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { DeleteCarRepository } from '@/data/protocols/db/delete-car-repository'
import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { ListCarRepository } from '@/data/protocols/db/list-car-repository'
import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCarModel, ListCarModel, UpdateCarModel } from '@/domain/usecases/car'
import { Collection, ObjectId } from 'mongodb'
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
    await carCollection.deleteOne({ _id: new ObjectId(carId) })
  }

  async get(carId: string): Promise<CarModel> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    const result = await carCollection.findOne({ _id: new ObjectId(carId) })
    return result ? MongoHelper.map(result) : null
  }

  async list(filters?: ListCarModel): Promise<CarModel[]> {
    const carCollection: Collection<CarModel> = await MongoHelper.getCollection('cars')

    const selectedFilters = Object.keys(filters || {})
    const makeQuery = (filters: ListCarModel) => {
      const filtersMap = {
        default: 'default',
        mileage: 'toEqual',
        minYear: 'gte',
        maxYear: 'lte',
        minPrice: 'gte',
        maxPrice: 'lte'
      }

      const filtersMapToField = {
        minYear: 'year',
        maxYear: 'year',
        minPrice: 'price',
        maxPrice: 'price'
      }

      const filtersHelper = {
        default: (value: string) => ({ $regex: value, $options: 'i' }),
        toEqual: (value: string) => ({ $eq: value }),
        lte: (value: string) => ({ $lte: value }),
        gte: (value: string) => ({ $gte: value })
      }

      return selectedFilters.reduce((agg, crr) => {
        const type = filtersMap[crr] || filtersMap.default
        const field = filtersMapToField[crr] || crr
        agg[field] = Object.assign(
          { ...agg[field] }, filtersHelper[type](filters[crr])
        )
        return agg
      }, {})
    }

    const result = await carCollection.find(makeQuery(filters)).toArray()
    const mappedResult = result.map(car => MongoHelper.map(car))
    return mappedResult
  }

  async update(carId: string, carData: UpdateCarModel): Promise<void> {
    const carCollection: Collection<AddCarModel> = await MongoHelper.getCollection('cars')
    await carCollection.updateOne({ _id: new ObjectId(carId) }, { $set: carData })
  }
}

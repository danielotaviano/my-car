import { DbAddCar } from '@/data/usecases/add-car/db-add-car'
import { CarMongoRepository } from '@/infra/db/mongodb/car/car-mongo-repository'
import { AddCarController } from '@/presentation/controllers/car-controllers/add-car/add-car-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeAddCarValidation } from './add-car-validation-factory'

export const makeAddCarController = (): Controller => {
  const mongoCarRepository = new CarMongoRepository()
  const dbAddCar = new DbAddCar(mongoCarRepository)
  return new AddCarController(dbAddCar, makeAddCarValidation())
}

import { DbUpdateCar } from '@/data/usecases/update-car/db-update-car'
import { CarMongoRepository } from '@/infra/db/mongodb/car/car-mongo-repository'
import { UpdateCarController } from '@/presentation/controllers/car-controllers/edit-car/update-car-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeUpdateCarValidation } from './update-car-validation-factory'

export const makeUpdateCarController = (): Controller => {
  const mongoCarRepository = new CarMongoRepository()
  const dbUpdateCar = new DbUpdateCar(mongoCarRepository, mongoCarRepository)
  return new UpdateCarController(dbUpdateCar, makeUpdateCarValidation())
}

import { DbDeleteCar } from '@/data/usecases/delete-car/db-delete-car'
import { CarMongoRepository } from '@/infra/db/mongodb/car/car-mongo-repository'
import { DeleteCarController } from '@/presentation/controllers/car-controllers/delete-car/delete-car-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeDeleteCarcontroller = (): Controller => {
  const mongoCarRepository = new CarMongoRepository()
  const dbDeleteCar = new DbDeleteCar(mongoCarRepository, mongoCarRepository)
  return new DeleteCarController(dbDeleteCar)
}

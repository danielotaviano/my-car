import { DbGetCar } from '@/data/usecases/get-car/db-get-car'
import { CarMongoRepository } from '@/infra/db/mongodb/car/car-mongo-repository'
import { GetCarController } from '@/presentation/controllers/car-controllers/get-car/get-car-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeGetCarController = (): Controller => {
  const mongoCarRepository = new CarMongoRepository()
  const dbGetCar = new DbGetCar(mongoCarRepository)
  return new GetCarController(dbGetCar)
}

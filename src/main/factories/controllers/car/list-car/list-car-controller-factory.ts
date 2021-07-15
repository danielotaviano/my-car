import { DbListCar } from '@/data/usecases/list-cars/db-list-car'
import { CarMongoRepository } from '@/infra/db/mongodb/car/car-mongo-repository'
import { ListCarController } from '@/presentation/controllers/car-controllers/list-cars/list-car-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeListCarController = (): Controller => {
  const mongoCarRepository = new CarMongoRepository()
  const dbListCar = new DbListCar(mongoCarRepository)
  return new ListCarController(dbListCar)
}

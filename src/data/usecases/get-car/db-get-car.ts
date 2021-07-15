import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { CarModel } from '@/domain/models/car'
import { GetCar } from '@/domain/usecases/car'

export class DbGetCar implements GetCar {
  constructor(
    private readonly getCarRepository: GetCarRepository
  ) {}

  async get(carId: string):Promise<CarModel> {
    await this.getCarRepository.get(carId)
    return null
  }
}

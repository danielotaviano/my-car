import { AddCarRepository } from '@/data/protocols/db/add-car-repository'
import { CarModel } from '@/domain/models/car'
import { AddCar, AddCarModel } from '@/domain/usecases/car'

export class DbAddCar implements AddCar {
  constructor(
    private readonly addCarRepository: AddCarRepository
  ) {}

  async add(carData: AddCarModel):Promise<CarModel> {
    await this.addCarRepository.add(carData)

    return null
  }
}

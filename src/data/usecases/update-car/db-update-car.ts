import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { CarModel } from '@/domain/models/car'
import { UpdateCar, UpdateCarModel } from '@/domain/usecases/car'

export class DbUpdateCar implements UpdateCar {
  constructor(
    private readonly updateCarRepository: UpdateCarRepository
  ) {}

  async update(carId: string, carData: UpdateCarModel):Promise<CarModel> {
    await this.updateCarRepository.update(carId, carData)
    return null
  }
}

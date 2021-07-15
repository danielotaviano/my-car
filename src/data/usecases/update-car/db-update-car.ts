import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { CarModel } from '@/domain/models/car'
import { UpdateCar, UpdateCarModel } from '@/domain/usecases/car'

export class DbUpdateCar implements UpdateCar {
  constructor(
    private readonly updateCarRepository: UpdateCarRepository,
    private readonly getCarRepository: GetCarRepository
  ) {}

  async update(carId: string, carData: UpdateCarModel):Promise<CarModel> {
    const isExists = await this.getCarRepository.get(carId)
    if (!isExists) return null

    const car = await this.updateCarRepository.update(carId, carData)
    return car
  }
}

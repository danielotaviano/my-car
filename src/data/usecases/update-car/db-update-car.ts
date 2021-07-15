import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { UpdateCarRepository } from '@/data/protocols/db/update-car-repository'
import { UpdateCar, UpdateCarModel } from '@/domain/usecases/car'

export class DbUpdateCar implements UpdateCar {
  constructor(
    private readonly updateCarRepository: UpdateCarRepository,
    private readonly getCarRepository: GetCarRepository
  ) {}

  async update(carId: string, carData: UpdateCarModel):Promise<void> {
    const isExists = await this.getCarRepository.get(carId)
    if (!isExists) return null

    await this.updateCarRepository.update(carId, carData)
  }
}

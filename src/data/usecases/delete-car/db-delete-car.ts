import { DeleteCarRepository } from '@/data/protocols/db/delete-car-repository'
import { GetCarRepository } from '@/data/protocols/db/get-car-repository'
import { CarModel } from '@/domain/models/car'
import { DeleteCar } from '@/domain/usecases/car'

export class DbDeleteCar implements DeleteCar {
  constructor(
    private readonly deleteCarRepository: DeleteCarRepository,
    private readonly getCarRepository: GetCarRepository
  ) {}

  async delete(carId: string):Promise<CarModel> {
    await this.deleteCarRepository.delete(carId)
    return null
  }
}

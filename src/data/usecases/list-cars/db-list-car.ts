import { ListCarRepository } from '@/data/protocols/db/list-car-repository'
import { CarModel } from '@/domain/models/car'
import { ListCarModel, ListCars } from '@/domain/usecases/car'

export class DbListCar implements ListCars {
  constructor(
    private readonly listCarRepository: ListCarRepository
  ) {}

  async list(filters: ListCarModel):Promise<CarModel[]> {
    const cars = await this.listCarRepository.list(filters)
    return cars
  }
}

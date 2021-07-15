import { CarModel } from '@/domain/models/car'
import { UpdateCarModel } from '@/domain/usecases/car'

export interface UpdateCarRepository {
  update(carId: string, carData: UpdateCarModel): Promise<CarModel>
}

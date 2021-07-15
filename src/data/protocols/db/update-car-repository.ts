import { UpdateCarModel } from '@/domain/usecases/car'

export interface UpdateCarRepository {
  update(carId: string, carData: UpdateCarModel): Promise<void>
}

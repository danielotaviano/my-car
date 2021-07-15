import { CarModel } from '@/domain/models/car'

export interface DeleteCarRepository {
  delete(carId: string): Promise<CarModel>
}

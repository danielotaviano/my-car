import { CarModel } from '@/domain/models/car'

export interface GetCarRepository {
  get(carId: string): Promise<CarModel>
}

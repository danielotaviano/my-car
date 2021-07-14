import { CarModel } from '@/domain/models/car'
import { AddCarModel } from '@/domain/usecases/car'

export interface AddCarRepository {
  add (account: AddCarModel): Promise<CarModel>
}

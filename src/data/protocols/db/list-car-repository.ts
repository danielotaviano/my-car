import { CarModel } from '@/domain/models/car'
import { ListCarModel } from '@/domain/usecases/car'

export interface ListCarRepository {
  list(filters: ListCarModel): Promise<CarModel[]>
}

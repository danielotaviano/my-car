import { CarModel } from '../models/car'

export type AddCarModel = {
  brand: string
  model: string
  version: string
  year: number
  mileage: number
  gearbox: 'manual' | 'automatic'
  price: number
}

export type UpdateCarModel = Partial<AddCarModel>

export interface CarUseCases {
  add(car: AddCarModel): Promise<CarModel>
  list(): Promise<CarModel[]>
  get(carId: string, car: UpdateCarModel): Promise<CarModel[]>
  update(carId: string): Promise<CarModel>
  delete(carId: string): Promise<CarModel>
}

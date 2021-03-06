import { CarModel } from '../models/car'

export type AddCarModel = {
  brand: string
  model: string
  version: string
  year: number
  mileage: number
  gearbox: string
  price: number
}
export type ListCarModel = {
  brand?: string
  model?: string
  version?: string
  minYear?: number
  maxYear?: number
  mileage?: number
  gearbox?: string
  minPrice?: number
  maxPrice?: number
}
export type UpdateCarModel = Partial<AddCarModel>

export interface AddCar {
  add(car: AddCarModel): Promise<CarModel>
}

export interface ListCars {
  list(filters: ListCarModel): Promise<CarModel[]>
}

export interface GetCar {
  get(carId: string): Promise<CarModel>
}

export interface UpdateCar {
  update(carId: string, carData: UpdateCarModel): Promise<boolean>
}
export interface DeleteCar {
  delete(carId: string): Promise<boolean>
}

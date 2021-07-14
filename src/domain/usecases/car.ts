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

export type UpdateCarModel = Partial<AddCarModel>

export interface AddCar {
  add(car: AddCarModel): Promise<CarModel>
}

export interface ListCars {
  list(): Promise<CarModel[]>
}

export interface GetCar {
  get(carId: string, car: UpdateCarModel): Promise<CarModel[]>
}

export interface UpdateCar {
  update(carId: string): Promise<CarModel>
}
export interface DeleteCar {
  delete(carId: string): Promise<CarModel>
}

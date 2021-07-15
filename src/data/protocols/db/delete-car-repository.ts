
export interface DeleteCarRepository {
  delete(carId: string): Promise<void>
}

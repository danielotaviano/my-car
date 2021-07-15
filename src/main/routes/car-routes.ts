import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route.adapter'
import { makeAddCarController } from '../factories/controllers/car/add-car/add-car-controller-factory'
import { makeUpdateCarController } from '../factories/controllers/car/update-car/update-car-controller-factory'

export default (router: Router): void => {
  router.post('/car', adaptRoute(makeAddCarController()))
  router.put('/car/:id', adaptRoute(makeUpdateCarController()))
}

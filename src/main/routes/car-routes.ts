import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route.adapter'
import { makeAddCarController } from '../factories/controllers/car/add-car/add-car-controller-factory'
import { makeGetCarController } from '../factories/controllers/car/get-car/get-car-controller-factory'
import { makeListCarController } from '../factories/controllers/car/list-car/list-car-controller-factory'
import { makeUpdateCarController } from '../factories/controllers/car/update-car/update-car-controller-factory'

export default (router: Router): void => {
  router.post('/car', adaptRoute(makeAddCarController()))
  router.put('/car/:id', adaptRoute(makeUpdateCarController()))
  router.get('/car/', adaptRoute(makeListCarController()))
  router.get('/car/:id', adaptRoute(makeGetCarController()))
}

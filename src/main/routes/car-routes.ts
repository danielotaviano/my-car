import { Router } from 'express'
import { adaptRoute } from '../adpters/express-route.adapter'
import { makeAddCarController } from '../factories/controllers/car/add-car/add-car-controller-factory'

export default (router: Router): void => {
  router.post('/car', adaptRoute(makeAddCarController()))
}

import {
  createRouter,
  createWebHistory
} from 'vue-router'
import routes from '~/data/routes'
import beforeHandler from './before-handler'
import afterHandler from './after-handler'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(beforeHandler)
router.afterEach(afterHandler)

export default router
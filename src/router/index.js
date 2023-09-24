import {
  createRouter,
  createWebHistory
} from 'vue-router'
import routes from '~/data/routes'
import checkACL from '~/router/check-acl'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(checkACL)

export default router
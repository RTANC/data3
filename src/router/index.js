import Vue from 'vue'
import Router from 'vue-router'
import staffMgr from '@/components/staffMgr'
import staffGradMgr from '@/components/staffGradMgr'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'staffMgr',
      component: staffMgr
    },
    {
      path: '/staff/:id/grad',
      name: 'staffGradMgr',
      component: staffGradMgr
    }
  ]
})

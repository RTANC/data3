import Vue from 'vue'
import Router from 'vue-router'
import staffMgr from '@/components/staffMgr'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: staffMgr
    }
  ]
})

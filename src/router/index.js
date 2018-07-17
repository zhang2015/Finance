import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import sugarList from '@/components/sugarList'
import sugarDetail from '@/components/sugarDetail'
import sugarShare from '@/components/sugarShare'
import mySugar from '@/components/mySugar'
import own from '@/components/own'
import article from '@/components/article/article'
import video from '@/components/article/video'
import dynamic from '@/components/dynamic'
import about from '@/components/static/about'
import agreement from '@/components/static/agreement'
import clause from '@/components/static/clause'
import groupDynamic from '@/components/groupDynamic'
import group from '@/components/group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //糖果首页
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sugarList',
      name: 'sugarList',
      component: sugarList
    },
    {
      path: '/sugarDetail/:id/:type',
      name: 'sugarDetail',
      component: sugarDetail
    },
    {
      path: '/sugarShare/:id',
      name: 'sugarShare',
      component: sugarShare
    },
    {
      path: '/mySugar', //我的糖果
      name: 'mySugar',
      component: mySugar
    },
    {
      path: '/own',
      name: 'own',
      component: own
    },
    {
      path: '/article/:id', //咨询分享
      name: 'article',
      component: article
    },
    {
      path: '/video/:id', //视频分享
      name: 'video',
      component: video
    },
    {
      path: '/dynamic/:id', //动态分享
      name: 'dynamic',
      component: dynamic
    },
    {
      path: '/about', 
      name: 'about',
      component: about
    },
    {
      path: '/agreement', 
      name: 'agreement',
      component: agreement
    },
    {
      path: '/clause', 
      name: 'clause',
      component: clause
    },
    {
      path: '/group', 
      name: 'group',
      component: group
    },
    {
      path: '/groupDynamic/:id', 
      name: 'groupDynamic',
      component: groupDynamic
    }
  ]
})

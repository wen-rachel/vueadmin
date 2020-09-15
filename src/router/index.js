import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router =  new Router({
  routes: [
    {
      path: '/login',
      component:()=>import("@/views/Login"),
      meta:{ title:"登录" }
    },
    {
      path: '/',
      component: () => import("@/views/Layout"),
      meta: { title: "xx管理系统" },
      redirect:"/index",
      children:[
        // {
        //   path: '/welcome',
        //   component: () => import("@/views/Welcome"),
        //   meta: { title: "欢迎" }
        // },
        {
          path: '/index',
          component: () => import("@/views/Index"),
          meta: { title: "后台首页" }
        },
        {
          path: '/menu',
          component: () => import("@/views/System/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path: '/role',
          component: () => import("@/views/System/Role"),
          meta: { title: "角色管理" }
        },
        {
          path: '/user',
          component: () => import("@/views/System/User"),
          meta: { title: "管理员管理" }
        },
        {
          path: '/category',
          component: () => import("@/views/Shop/Category"),
          meta: { title: "商品分类管理" }
        },
        {
          path:'/specs',
          component:() => import("@/views/Shop/Specs"),
          meta:{title:'商品规格管理'}
        },
        {
          path:'/member',
          component:()=>import("@/views/Shop/Member"),
          meta:{title:"会员管理"}
        },
        {
          path:"/banner",
          component:()=>import('@/views/Shop/Banner'),
          meta:{title:'轮播图管理'}
        },
        {
          path:"/seckill",
          component:()=>import("@/views/Shop/Seckill"),
          meta:{title:"秒杀管理"}
        },      
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path == "/login"){
    document.title = to.meta.title
    next();
  }else{
    // 判断是否登录
    if(localStorage.getItem("userinfo")){
      let whiteList = store.getters['user/menus_url']
      whiteList.push('/index')
  // 判断他要去哪儿
      if(whiteList.includes(to.path)){
        document.title = to.meta.title
        next();
      }
    }else{
    // 没登录就得到login去登录
      next('/login')
    }
  }
})

export default router;

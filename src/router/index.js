import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // 主应用布局
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'MainWeb', component: () => import('@/views/mainWeb.vue') },
      { path: 'moviesWeb', name: 'MoviesWeb', component: () => import('@/views/moviesWeb.vue') },
      { path: 'cinemaWeb', name: 'CinemaWeb', component: () => import('@/views/cinemaWeb.vue') },
      { path: 'recommendWeb', name: 'RecommendWeb', component: () => import('@/views/recommendWeb.vue') },
      { path: 'buyWeb', name: 'BuyWeb', component: () => import('@/views/buyWeb.vue') },
      { path: 'whoWeb', name: 'WhoWeb', component: () => import('@/views/whoWeb.vue') },
      { path: 'changeWeb', name: 'ChangeWeb', component: () => import('@/views/login/changeWeb.vue') },
      { path: 'loginPage', name: 'loginPage', component: () => import('@/views/loginPage.vue') },
  
      { path: 'detailsWeb', name: 'DetailsWeb', component: () => import('@/detailsWeb.vue') },
      
      {
        path: 'loginlogin',
        name: 'LoginLogin',
        component: () => import('@/views/login/loginLogin.vue')
      },
      {
        path: 'loginregister',
        name: 'LoginRegister',
        component: () => import('@/views/login/loginRegister.vue')
      },
      {
        path: 'personalHub',
        name: 'PersonalHub',
        component: () => import('@/views/login/personalHub.vue'),
      },
      
     
      
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   const isSameRoute = to.fullPath === from.fullPath;
//   if (isSameRoute) {
//     const originalPush = VueRouter.prototype.push;
//     VueRouter.prototype.push = function push(location) {
//       return originalPush.call(this, location).catch(err => {
//         if (err.name === 'NavigationDuplicated') {
//           next(false); // 阻止默认的导航行为
//         } else {
//           throw err;
//         }
//       });
//     };
//   }
//   next();
// });

export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const beforeAuth=(to,from,next)=>{
    const isAuth=store.getters.isAuth;
    (!isAuth && to.meta.auth)? next('/login'):next();
}

const router =new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            component:()=>import('../components/Home.vue'),
            meta:{auth:true},
            beforeEnter:beforeAuth

        },
        {
            path:'/login',
            component:()=>import('../components/Login.vue')
        },
        {
            path:'/b/:bid',
            component:()=>import('../components/Board.vue'),
            meta:{auth:true},
            beforeEnter:beforeAuth

        },
        {
            path:'*',
            component:()=>import('../components/common/PageNotFound.vue'),
        },

    ]
})

export default router;
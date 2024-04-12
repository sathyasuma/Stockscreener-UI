import Vue from "vue";
import Router from 'vue-router';
import HomeNav from './components/Home-nav.vue'
import LogIn from './components/Log-in.vue'
import SignUp from './components/Sign-up.vue'
import Stockpage from './components/Stock-page.vue'
import StockView from "./components/Stock-view.vue";
import MyWatchlist from './components/My-watchlist.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {path:'/',component:HomeNav},
        {path:'/home',component:HomeNav},
        {path:'/login',component:LogIn},
        {path:'/signup',component:SignUp},
        {path:'/stocks',component:Stockpage},
        {path:'/stockview',component:StockView},
        {path:'/watchlist',component:MyWatchlist},
    ]
})
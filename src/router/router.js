import Vue from 'vue'
import Router from 'vue-router'

import authorization from "@/components/authorization";
import Registrtion from "@/components/Registrtion";

Vue.use(Router);

let router = new Router
({
    routes: [{
        path:'/',
        name:'authorization',
        component: authorization
    },
        {
            path:'/registration',
            name:'registration',
            component:Registrtion
        }
    ]
})

export default router
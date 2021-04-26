import Vue from 'vue'
import Router from 'vue-router'

import authorization from "@/components/authorization";
import Registrtion from "@/components/Registrtion";
import PhoneConfirm from "@/components/PhoneConfirm";

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
        },
        {
            path:'/phoneconfirm',
            name:'phoneconfirm',
            component:PhoneConfirm
        }
    ]
})

export default router
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('../components/Main/Main').default,
            children: [
                {
                    path: 'editor/:key/:type',
                    name: 'editor',
                    component: require('../components/Main/Editor/Editor').default,
                    children: [
                        {
                            path: 'str',
                            name: 'STR',
                            component: require('../components/Main/Editor/STR').default
                        },
                        {
                            path: 'hash',
                            name: 'HASH',
                            component: require('../components/Main/Editor/HASH').default
                        },
                        {
                            path: 'list',
                            name: 'LIST',
                            component: require('../components/Main/Editor/LIST').default
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

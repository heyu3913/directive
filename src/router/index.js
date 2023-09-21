//本项目采用路由根据文件自动生成，所以大家注意查看路由生成规则'pages/文件名'
import { createRouter, createWebHistory } from 'vue-router'
const routes = import.meta.glob('../pages/*.vue')
const pages = Object.keys(routes).map((path) => {
    const name = path.match(/\.\/(.*)\.vue$/)[1]
    return {
        path: `/${name.toLowerCase()}`,
        component: routes[path],
        name,
    }
})
console.log('pages', pages)
    // [
    // {
    //     "path": "/pages/debounce",
    //     "name": "pages/Debounce"
    // },
    //     {
    //         "path": "/pages/draggable",
    //         "name": "pages/Draggable"
    //     },
    //     {
    //         "path": "/pages/home",
    //         "name": "pages/Home"
    //     },
    //     {
    //         "path": "/pages/notfound",
    //         "name": "pages/NotFound"
    //     },
    //     {
    //         "path": "/pages/permission",
    //         "name": "pages/Permission"
    //     },
    //     {
    //         "path": "/pages/resize",
    //         "name": "pages/Resize"
    //     },
    //     {
    //         "path": "/pages/throttle",
    //         "name": "pages/Throttle"
    //     },
    //     {
    //         "path": "/pages/lazyload",
    //         "name": "pages/lazyLoad"
    //     },
    //     {
    //         "path": "/pages/regrule",
    //         "name": "pages/regRule"
    //     },
    //     {
    //         "path": "/pages/scrollload",
    //         "name": "pages/scrollLoad"
    //     },
    //     {
    //         "path": "/pages/wartermarker",
    //         "name": "pages/warterMarker"
    //     }
    // ]
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/pages/home',
        },
        ...pages,
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../pages/NotFound.vue'),
        },
    ],
})

export default router

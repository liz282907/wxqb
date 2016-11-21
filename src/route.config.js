/* eslint-disable global-require*/
import VueRouter from 'vue-router';
import Vue from 'vue';

import management from './pages/management'
import search from './components/search/search.vue';
import search_result from './components/search/search_result.vue'
import vis from './components/vis/vis.vue'

Vue.use(VueRouter);

/**
    - app
        - management
            - upload
            - update
            - download
        - vis
        - search

*/

let route = [
    {
        path: '/app',
        component: require('./pages/app-main.vue'),
        children: [
        {
            path: 'management',
            name: 'management',
            component: management,
            children:[
                {
                    path: 'upload',
                    name: '情报添加',
                    component: require('./pages/upload-page.vue'),
                },
                {
                    path: 'info-typein',
                    name: '情报添加',
                    component: require('./pages/info-typein.vue'),
                },
                {
                    path: 'update',
                    name: '情报修改',
                    component: require('./pages/update-page.vue'),
                },
                {
                    path: 'download',
                    name: '情报下载',
                    component: require('./pages/download-page.vue'),
                },
                { path: '*', redirect: '/app/management/info-typein.vue' }
            ]
        },
        { path: 'searchResult', name: 'search_result', component: search_result },
        { path: 'vis', name: 'vis', component: vis }
        ]
    },
    { path: 'search', name: 'search', component: search },


];

route.push({ path: '*', redirect: '/app/management' });
route.push({ path: '/app*', redirect: '/app/management' });
route.push({ path: '/app/management*', redirect: '/app/management/info-typein' })

const router = new VueRouter({
    mode: 'hash',

    scrollBehavior,
    /* default */
    routes: route,
});

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}

    if (to.hash) {
      position.selector = to.hash
    }
    console.log("---------",position);

    return position
  }
}

// const routes = [
//     { path: '/management', name: 'management', component: management },
//     { path: '/search', name: 'search', component: search },
//     { path: '/searchResult', name: 'search_result', component: search_result },
//     { path: '/vis', name: 'vis', component: vis }
// ];


export default router;

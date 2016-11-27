import style from './style.scss';

import http from './core/http';
import store from './core/store';
//components
import heatmap from './components/heatmap/heatmap';
import pingmap from './components/pingmap/pingmap';
import profile from './components/profile/profile';

import dashboard from './components/dashboard';

//import pusher from './components/pusher/pusher';
import toast from './components/toast/toast';
import modal from './components/modal/modal';
import vued from 'vue-drag-and-drop';

const routes = [
  { path: '/dashboard', component: dashboard },
  { path: '/heatmap', component: heatmap },
  { path: '/pingmap', component: pingmap },
  { path: '/profile', component: profile },
  {path: '', redirect: '/dashboard'}
];
const router = new VueRouter({
  routes //
});


const instance = new Vue({
  router,
  mounted(){
    store.listen('modal', (show)=>{
        this.showModal = !this.showModal;
    });
    store.listen('router', (name)=>{
        router.push(name);
    });
  },
  data:{
    showModal:false
  }
});

instance.$mount('#app');

//toast.make('User needs help', 'Dismiss');
//unpin_user
//

// ( function() {
//   http.get("http://40.113.85.15/cashmesh?get_active_tickets")
//   .then((_data) => {
//     console.log(_data);
//   })
//   .catch((err) => {
//     console.warn(err);
//   })
// })();

( function() {

  window.setUnpinned = function () {

          http.get("http://40.113.85.15/cashmesh?unpin_user=2")
          .then((_data) => {
            console.log(_data);
          })
          .catch((err) => {
            console.warn(err);
          })
  };

})();

/**
* Module
*/
const app = function() {
  'use strict';

  let app = {};
  return app;
};


(() => {

  let collapse = document.querySelector('.navbar-collapse');
  let links = document.querySelector('.router-link');

  document.querySelector('#toggle-collapse')
  .addEventListener('click', (event)=>{
    collapse.classList.toggle('collapse');
  });

  collapse.addEventListener('click', ()=>{
    if(window.innerWidth < 767 ){
        collapse.classList.toggle('collapse');
    }
  });

  window.addEventListener('resize', ()=>{
    store.set('resize', true);
  });

})();

export default app();

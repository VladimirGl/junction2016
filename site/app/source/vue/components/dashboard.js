
import store from '../core/store';
/**
* Module
*/
const dashboard = function() {
  'use strict';

  let dashboard = Vue.extend({
    template:`
      <div class="view">

      <div class="app-header dashboard">
        <div class="container">
          <div class="app-heading">
            <h1 class="app-heading-heading text-center">Keep in touch. Visualize. Drive your sales.</h1>
            <p class="app-description">

            </p>
          </div>
        </div>
      </div>


      <div class="dashboard-body">
        <div class="container">
        <div class="row">
          <div class="dashboard-col" v-for="section in sections">
          <div class="card card--big dashboard-card a">
            <div v-bind:style="{'background-image': getBg(section.bg)}"class="card__image card__image__bg"></div>
            <h2 class="card__title">{{section.name}}</h2>
            <span class="card__subtitle">{{section.subtitle}}</span>
            <p class="card__text">{{section.desc}}<br>
            </p>

            <div class="card__action-bar dashboard-card-action a">
                <span class="card-action" v-on:click="goto(section.link)">View</span>
            </div>
          </div>
          </div>

        </div>
        </div>

      </div>

      </div>
    `,
    data(){
      return {
        sections:[
          {
            name:"Heatmap",
            subtitle:"test",
            desc:"Find out the hottest place in your store",
            link:'/heatmap',
            bg:'/images/heatmap.png'
          },
          {
            name:"Customer map",
            subtitle:"V",
            desc:"View customer locations in real time",
            link:'/pingmap',
            bg:'/images/customer-map.png'
          },

        ]
      };
    },
    methods:{
      goto(name){
          store.set('router', name);
      },
      getBg(bg){ console.log('bgbgbgbg', bg);
        return `url(${bg})`;
      }
    }
  });

  return dashboard;
};

export default dashboard();

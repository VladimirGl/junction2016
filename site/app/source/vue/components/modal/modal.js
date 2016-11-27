
import store from '../../core/store';
import style from './style.scss';

/**
* Module
*/
const modal = function() {
  'use strict';

  let startX;
  let startY;

  let modal = Vue.component('modal',{
    template:`<transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" draggable="true" v-on:drag="dragAction($event)"  v-on:dragstart="dragStart($event)">
            <div class="card card--big"  >
              <div style="background-image: url(/images/bg-outwear-xs.jpg)" class="card__image"></div>
              <h2 class="card__title">{{section.name}}</h2>
              <span class="card__subtitle">{{section.subtitle}}</span>
              <p class="card__text">{{section.desc}}<br>
                <span class="card-action"  @click="$emit('close')">Close</span>
                <slot name="body"></slot>
              </p>

              <div class="card__action-bar">
                <ul class="list-item-list">
                <li class="list-item">
                  <span class="avatar"><img class="avatar-image" src="/images/jacket.png"></span>
                  <span class="name">Jacket 100e</span>
                </li>
                <li class="list-item">
                    <span class="avatar"><img class="avatar-image"  src="/images/jacket.png"></span>
                    <span class="name">Jacket 100e</span>
                </li>
                <li class="list-item">
                    <span class="avatar"><img class="avatar-image"  src="/images/jacket.png"></span>
                    <span class="name">Jacket 100e</span>
                </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </transition>`,
    data(){
      return {
        section:{
          name:'Clothing',
          subtitle:'Outwear',
          desc:"Outdoor wear and clothing"
        }
      };
    },
    methods:{
      handleImageDrop(){
        console.log('DROP');
      },
      dragStart(event){
        startX = event.screenX;
        startY = event.screenY;
      },
      dragAction(event){
        //if(event.screenX !==  startX && event.screenY !== event.screenY)
      //    event.target.style.transform = `translate(${event.offsetX}px, ${event.offsetY}px)`;
        console.log(event);
      }
    },
    mounted(){
      store.listen('modal', ()=>{
        console.log('MODALMODALMMODAL');
      });
    }
  });

  return modal;
};

export default modal();

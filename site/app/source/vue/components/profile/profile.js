
import store from '../../core/store';
import style from './profile.scss';
/**
* Module
*/
const pingmap = function() {
  'use strict';

  const POINT_MAP = 'http://40.113.85.15/cashmesh?get_positions';
  const USER_PING = 'http://40.113.85.15/cashmesh?get_active_tickets';
  let _intervals = {};
  let _isToast = false;
  let pingmap = Vue.extend({
    template:`<div class="view">
      <div class="profile">

        <div class="profile-header" v-bind:style="{'background-image': getBg()}">
          <div class="container">
            <h1 class="profile-heading">Outwear</h1>
          </div>
        </div>

        <div class="container">
          <div class="profile-body">
            <h3 class="profile-body-heading">Top items</h3>
            <div class="profile-list">

              <ul class="profile-item-list">

                <li class="profile-item">
                  <div class="profile-item-col">
                    <div class="row">
                      <div class="col-sm-3 col-xs-3">
                        <span class="profile-avatar"><img class="profile-image" src="/images/sweater.png"></span>

                      </div>
                      <div class="col-sm-9 col-xs-9">
                        <span class="name">Sweater</span>
                        <span class="profile-item-desc">
                          Autumn Cashmere ribbed cashmere-blend sweater.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="profile-item-col-2">
                    <span class="profile-item-price">200€</span>
                  </div>
                  <div class="profile-item-col-3">
                    <span class="profile-item-price">Available sizes</span>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">s</span>
                      <span class="sizes sizes-xs sizes-label">20</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">m</span>
                      <span class="sizes sizes-xs sizes-label">10</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">l</span>
                      <span class="sizes sizes-xs sizes-label">8</span>
                    </div>
                  </div>

                </li>
                <li class="profile-item">
                  <div class="profile-item-col">
                    <div class="row">
                      <div class="col-sm-3 col-xs-3">
                        <span class="profile-avatar"><img class="profile-image" src="/images/hoodie.png"></span>

                      </div>
                      <div class="col-sm-9 col-xs-9">
                        <span class="name">Hoodie</span>
                        <span class="profile-item-desc">
                          Grizzly Long Range pullover fleece hoodie. Colorblock construction.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="profile-item-col-2">
                    <span class="profile-item-price-discounted">80€</span>
                    <span class="profile-item-price-discount">50€</span>
                  </div>
                  <div class="profile-item-col-3">
                    <span class="profile-item-price">Available sizes</span>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">s</span>
                      <span class="sizes sizes-xs sizes-label">14</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">m</span>
                      <span class="sizes sizes-xs sizes-label">9</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">l</span>
                      <span class="sizes sizes-xs sizes-label">17</span>
                    </div>
                  </div>


                </li>
                <li class="profile-item">
                  <div class="profile-item-col">
                    <div class="row">
                      <div class="col-sm-3 col-xs-3">
                        <span class="profile-avatar"><img class="profile-image" src="/images/shirt.png"></span>

                      </div>
                      <div class="col-sm-9 col-xs-9">
                        <span class="name">Shirt</span>
                        <span class="profile-item-desc">
                          T-shirt with R2D2 print made from 100% organic cotton.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="profile-item-col-2">
                    <span class="profile-item-price">20€</span>
                  </div>
                  <div class="profile-item-col-3">
                    <span class="profile-item-price">Available sizes</span>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">s</span>
                      <span class="sizes sizes-xs sizes-label">12</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">m</span>
                      <span class="sizes sizes-xs sizes-label">17</span>
                    </div>
                    <div class="profile-item-sizes">
                      <span class="sizes sizes-xs sizes-label">l</span>
                      <span class="sizes sizes-xs sizes-label">5</span>
                    </div>
                  </div>


                </li>
              </ul>


            </div>
          </div>
        </div>

      </div>
    </div>`,
    data(){
      return {};
    },
    methods:{
        getBg(){
          return "url('/images/bg-outwear.jpg')";
        }
    },
    created(){

    },
    mounted(){

    },
    destroyed(){

    }
  });


  return pingmap;
};

export default pingmap();

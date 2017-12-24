import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash';
import moment from 'moment';

export const bus = new Vue();
new Vue({
  el: '#app',
  render: h => h(App)
})

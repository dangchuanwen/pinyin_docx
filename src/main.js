import Vue from "vue";
import App from "./App.vue";
import less from "less";
import "./reset.css";
import "./assets/iconfont/iconfont.css";

Vue.use(less);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

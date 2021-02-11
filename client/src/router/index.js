import Vue from "vue";
import Router from "vue-router";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ToDo from "@/pages/ToDo";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/todo",
      name: "Todo",
      component: ToDo
    }
  ]
});

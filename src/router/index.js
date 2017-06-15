import Vue from "vue";
import Router from "vue-router";

const Login = () => ({
    component: import ("@/pages/Login")
});

const Index = () => ({
    component: import ("@/pages/Index")
});

const List = () => ({
    component: import ("@/pages/List")
});

const Detail = () => ({
    component: import ("@/pages/Detail")
});

const Presale = () => ({
    component: import ("@/pages/Presale")
});

const Find = () => ({
    component: import ("@/pages/Find")
});

const ShopCart = () => ({
    component: import ("@/pages/ShopCart")
});

const My = () => ({
    component: import ("@/pages/My")
});

Vue.use(Router);
export default new Router({
    routes: [{
        path: "/",
        redirect: "/index"
    }, {
        path: "/login",
        name: "Login",
        component: Login
    }, {
        path: "/index",
        name: "Index",
        component: Index
    }, {
        path: "/list",
        name: "List",
        component: List
    }]
});

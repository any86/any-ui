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

const PresaleDetail = () => ({
    component: import ("@/pages/PresaleDetail")
});

const Explore = () => ({
    component: import ("@/pages/Explore")
});

const Bag = () => ({
    component: import ("@/pages/Bag")
});

const Checkout = () => ({
    component: import ("@/pages/Checkout")
});

const BillingAddress = () => ({
    component: import ("@/pages/BillingAddress")
});

const Payment = () => ({
    component: import ("@/pages/Payment")
});

const Category = () => ({
    component: import ("@/pages/Category")
});

const Personalized = () => ({
    component: import ("@/pages/Personalized")
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
    }, {
        path: "/bag",
        name: "Bag",
        component: Bag
    }, {
        path: "/checkout",
        name: "Checkout",
        component: Checkout
    }, {
        path: "/explore",
        name: "Explore",
        component: Explore
    }, {
        path: "/detail",
        name: "Detail",
        component: Detail
    }, {
        path: "/billingAddress",
        name: "BillingAddress",
        component: BillingAddress
    }, {
        path: "/payment",
        name: "Payment",
        component: Payment
    }, {
        path: "/category",
        name: "Category",
        component: Category
    }, {
        path: "/personalized",
        name: "Personalized",
        component: Personalized
    }, {
        path: "/presaleDetail",
        name: "PresaleDetail",
        component: PresaleDetail
    }, {
        path: "/my",
        name: "My",
        component: My
    }]
});

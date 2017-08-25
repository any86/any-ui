import Vue from "vue";
import Router from "vue-router";

const Entrance = () => ({
  component: import("@/pages/Entrance")
});

const Index = () => ({
  component: import("@/pages/Index")
});

const List = () => ({
  component: import("@/pages/List")
});

const Detail = () => ({
  component: import("@/pages/Detail")
});

const Explore = () => ({
  component: import("@/pages/Explore")
});

const Cart = () => ({
  component: import("@/pages/Cart")
});

const Checkout = () => ({
  component: import("@/pages/Checkout")
});

const BillingAddress = () => ({
  component: import("@/pages/BillingAddress")
});

const Payment = () => ({
  component: import("@/pages/Payment")
});

const Category = () => ({
  component: import("@/pages/Category")
});

const Personalized = () => ({
  component: import("@/pages/Personalized")
});

const My = () => ({
  component: import("@/pages/My")
});

const Forget = () => ({
  component: import("@/pages/Forget")
});

const Canvas = () => ({
  component: import("@/pages/Canvas")
});

const Search = () => ({
  component: import("@/pages/Search")
});

const RingDiy = () => ({
  component: import("@/pages/Detail/RingDiy")
});

const Svg = () => ({
  component: import("@/pages/Svg")
});

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "*-*",
      name: "Detail",
      component: Detail
    },
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/entrance",
      name: "Entrance",
      component: Entrance
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/list",
      name: "List",
      component: List
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout
    },
    {
      path: "/explore",
      name: "Explore",
      component: Explore
    },
    {
      path: "/billingAddress",
      name: "BillingAddress",
      component: BillingAddress
    },
    {
      path: "/payment",
      name: "Payment",
      component: Payment
    },
    {
      path: "/category",
      name: "Category",
      component: Category
    },
    {
      path: "/personalized",
      name: "Personalized",
      component: Personalized
    },
    {
      path: "/my",
      name: "My",
      component: My
    },
    {
      path: "/forget",
      name: "Forget",
      component: Forget
    },
    {
      path: "/canvas",
      name: "Canvas",
      component: Canvas
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/ringDiy",
      name: "RingDiy",
      component: RingDiy
    },
    {
      path: "/svg",
      name: "Svg",
      component: Svg
    }
  ]
});

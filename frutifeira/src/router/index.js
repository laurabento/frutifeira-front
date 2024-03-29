import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginAdm from "../views/LoginAdm.vue";
import CreateAccount from "../views/CreateAccount.vue";
import Condominium from "../views/Condominium.vue";
import Products from "../views/Products.vue";
import Payment from "../views/Payment.vue";
import Markets from "../views/Markets.vue";
import ListProduct from "../views/ListProduct.vue";
import ListAllProducts from "../views/ListAllProducts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/LoginAdm",
    name: "LoginAdm",
    component: LoginAdm,
  },
  {
    path: "/CreateAccount/:id",
    name: "Criar conta",
    component: CreateAccount,
  },
  {
    path: "/Condominium",
    name: "Condominium",
    component: Condominium,
  },
  {
    path: "/Products",
    name: "Products",
    component: Products,
  },
  {
    path: "/Payment",
    name: "Pagamento",
    component: Payment,
  },
  {
    path: "/Markets",
    name: "Markets",
    component: Markets,
  },
  {
    path: "/ListProduct/:id",
    name: "ListProduct",
    component: ListProduct,
  },
  {
    path: "/ListAllProducts/:id",
    name: "ListAllProducts",
    component: ListAllProducts,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import PageHome from "./components/PageHome.vue";
import PageCards from "./components/PageCards.vue";
import PageCredit from "./components/PageCredit.vue";
import PagePayments from "./components/PagePayments.vue";
import PageProfile from "./components/PageProfile.vue";

const routes = [
  {
    path: "/",
    redirect: "/cards",
  },
  {
    path: "/home",
    name: "PageHome",
    component: PageHome,
  },
  {
    path: "/cards",
    name: "PageCards",
    component: PageCards,
  },
  {
    path: "/credit",
    name: "PageCredit",
    component: PageCredit,
  },
  {
    path: "/payment",
    name: "PagePayments",
    component: PagePayments,
  },
  {
    path: "/profile",
    name: "PageProfile",
    component: PageProfile,
  },
];
// @ts-ignore <- ignore it
const router = createRouter({ routes, history: createWebHistory() });
export default router;

import { name as homePage } from "./pages/Home.js";
import { name as productsPage } from "./pages/Products.js";

const routerSlot = document.querySelector("main");
const router = new Router(routerSlot, { baseUrl: "/web/" });

router.setRoutes([
  {
    path: "/",
    component: homePage
  },
  {
    path: "/products/:code",
    component: productsPage
  }
]);
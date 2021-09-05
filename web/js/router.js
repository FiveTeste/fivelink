import { name as homePage } from "./pages/Home.js";
import { name as productsPage } from "./pages/Products.js";

const routerSlot = document.querySelector("page-content");
const router = new Router(routerSlot, { baseUrl: "/web/" });

const originalResolver = router.__resolveRoute;
router.__resolveRoute = function(...args) {
  return new Promise((resolve, reject) => {
    originalResolver.apply(this, args).then((result) => {
      if (result instanceof HTMLElement) {
        result.slot = "content";
      }

      resolve(result);
    }).catch(reject);
  });
}

router.setRoutes([
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/carrinho",
    component: homePage
  },
  {
    path: "/products/:code",
    component: productsPage
  }
]);

window.router = router;
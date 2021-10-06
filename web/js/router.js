import { name as homePage } from "./pages/Home.js";
import { name as productsPage } from "./pages/Products.js";
import { name as categoriesPage } from "./pages/Categories.js";
import { name as productPage } from "./pages/Product.js";
import { name as cartPage } from "./pages/Cart.js";


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
    component: cartPage
  },
  {
    path: ":code/produtos",
    name: "products",
    children: [
      {
        path: "/",
        component: productsPage,
      },
      {
        path: "/:productCode",
        component: productPage,
      },
    ]
  },
  {
    path: ":code/categorias",
    name: "categories",
    children: [
      {
        path: "/",
        component: categoriesPage,
      },
      {
        path: "/:categoryCode",
        component: productPage,
      }
    ]
  }
]);

window.router = router;
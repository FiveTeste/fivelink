import { name as homePage } from "./pages/Home.js";
import { name as productsPage } from "./pages/Products.js";
import { name as categoriesPage } from "./pages/Categories.js";
import { name as productPage } from "./pages/Product.js";
import { name as cartPage } from "./pages/Cart.js";
import { name as registerPage } from "./pages/Register.js";
import { name as updatePage } from "./pages/Update.js";
import { name as finishPage } from "./pages/Finish.js";

const base = `${window.baseUrl}/`;

const routerSlot = document.querySelector("page-content");
const router = new Router(routerSlot, { baseUrl: base });

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

const originalRouterGo = window.Router.go;
window.Router.go = function(url) {
  const targetUrl = new URL(`${window.location.origin}${url}`);
  const pathname = targetUrl.pathname;
  const newUrl = pathname === "/" ? base : `${window.baseUrl}${url}`;
  return originalRouterGo.apply(this, [newUrl]);
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
  },
  {
    path: "/cadastro",
    component: registerPage,
  },
  {
    path: "/atualizar-cadastro",
    component: updatePage,
  },
  {
    path: "/finish",
    component: finishPage,
  }
]);

window.router = router;
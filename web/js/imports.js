import { Router } from 'https://unpkg.com/@vaadin/router@1.7.4/dist/vaadin-router.js';
import { registerComponent } from "./utils/registerComponent.js";
import { createHtmlElement } from "./utils/createHtmlElement.js";
import { fireEvent } from "./utils/fireEvent.js";


  window.Router = Router;
  window.registerComponent = registerComponent;
  window.html = createHtmlElement;
  window.fireEvent = fireEvent;
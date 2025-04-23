import { Router } from './dependencies/vaadin-router.js';
import { registerComponent, createHtmlElement, fireEvent } from "./utils/utils.js";


window.Router = Router;
window.registerComponent = registerComponent;
window.html = createHtmlElement;
window.fireEvent = fireEvent;
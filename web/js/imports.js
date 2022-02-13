import { Router } from '/web/js/dependencies/vaadin-router.js';
import { registerComponent, createHtmlElement, fireEvent, moduleImport } from "/web/js/utils/utils.js";


window.Router = Router;
window.registerComponent = registerComponent;
window.html = createHtmlElement;
window.fireEvent = fireEvent;
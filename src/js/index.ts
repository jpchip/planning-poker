import { groupCollapsed } from "console";
import "../css/main.scss";
import "./poker";

import App from "./app.svelte";

let app = new App({
  target: document.body,
});
export default app;
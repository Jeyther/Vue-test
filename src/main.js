import { createApp } from "vue";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdModeeditoutline, MdPlusone, BiTrashFill } from "oh-vue-icons/icons";

import "./assets/main.css";

addIcons(MdModeeditoutline, MdPlusone, BiTrashFill);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");

import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import Dash from "@/components/Dash";
import Me from "@/components/Me";
import Sensor from "@/components/Sensor";
import Message from "@/components/Message";
import Update from "@/components/Update";
import Wiki from "@/components/Wiki";

Vue.use(Router);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

export default new Router({
	// mode: "history",
	routes: [
		{
			path: "/home",
			name: "Home",
			component: Home,
		},
		{
			path: "/dash",
			name: "Dash",
			component: Dash,
		},
		{
			path: "/me",
			name: "Me",
			component: Me,
		},
		{
			path: "/sensor",
			name: "Sensor",
			component: Sensor,
		},
		{
			path: "/message",
			name: "Message",
			component: Message,
		},
		{
			path: "/update",
			name: "Update",
			component: Update,
		},
		{
			path: "/wiki",
			name: "Wiki",
			component: Wiki,
		},
	],
});

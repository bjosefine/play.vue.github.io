import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Playlist from "./components/Playlist.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/playlist/:id", name: "playlist", component: Playlist },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

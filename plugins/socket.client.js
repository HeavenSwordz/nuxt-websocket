import io from "socket.io-client";
const socket = io("https://nuxt-websocket.netlify.app");

export default ({}, inject) => {
  inject("socket", socket);
};

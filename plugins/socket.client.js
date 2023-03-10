import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default ({}, inject) => {
  inject("socket", socket);
};

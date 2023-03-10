<template>
  <div>
    <div
      v-for="p in players"
      :style="{
        width: '10px',
        height: '10px',
        position: 'absolute',
        backgroundColor: 'red',
        top: `${p.pos.y}px`,
        left: `${p.pos.x}px`,
      }"
    ></div>
  </div>
</template>
<script setup>
const players = ref([]);

if (process.client) {
  const { $socket } = useNuxtApp();
  $socket.emit("server-position");

  document.addEventListener("keydown", (event) => {
    if (
      event.key == "ArrowUp" ||
      event.key == "ArrowDown" ||
      event.key == "ArrowLeft" ||
      event.key == "ArrowRight"
    ) {
      $socket.emit("server-position", event.key);
    }
  });

  $socket.on("client-position", (ps) => {
    players.value = ps || [];
  });
}
</script>

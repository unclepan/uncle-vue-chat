<template>
  <div id="app">
    <vueChat/>
  </div>
</template>

<script>
import vueChat from './vue-chat.vue';

export default {
  name: 'App',
  components: {
    vueChat,
  },
};
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  };
</style>

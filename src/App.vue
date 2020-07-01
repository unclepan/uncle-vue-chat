<template>
  <div id="app">
    <vueChat :feedList="feedList" :author="author"/>
  </div>
</template>

<script>
import vueChat from './vue-chat.vue';

export default {
  name: 'App',
  components: {
    vueChat,
  },
  data() {
    return {
      feedList: [
        {
          key: 0,
          id: 0,
          author: 'Person',
          contents: 'hi there',
          date: '16:30',
          type: 'message',
        },
      ],
      author: 1,
    };
  },
};
</script>

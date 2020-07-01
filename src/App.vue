<template>
  <div id="app">
    <vueChat :feedList="feedList" :author="author"/>
    <div :class="$style.footer">
      <iframe
        src="https://ghbtns.com/github-btn.html?user=unclepan&repo=uncle-vue-chat&type=star&count=true"
        frameborder="0"
        scrolling="0"
        width="150"
        height="20"
        title="GitHub">
      </iframe>
    </div>
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

<style lang="scss" module>
.footer{
  width: 560px;
  margin: 0 auto;
  padding: 30px 0;
}
</style>

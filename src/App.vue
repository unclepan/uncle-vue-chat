<template>
  <div :class="$style['uncle-vue-chat']">
    <header-item/>
    <div :class="$style.messages" ref="messages">
      <messages-list :feed="feed" :author-id="authorId"/>
    </div>
    <div @click="add()">add</div>
  </div>
</template>

<script>
import headerItem from './components/header-item.vue';

import messagesList from './components/messages/messages-list.vue';

export default {
  name: 'App',
  data() {
    return {
      feed: [{
        id: 0,
        author: 'Person',
        contents: 'hi there',
        date: '16:30',
      },
      {
        id: 1,
        author: 'Me',
        contents: 'hello至此,表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。 还没结束 上述例子中,在输入框中表情只能以文本的形式呈现。如果想在输入框中呈现输入的表情,该怎么',
        date: '16:30',
      },
      {
        id: 1,
        author: 'Me',
        contents: 'lol',
        date: '16:31',
      }],
      authorId: 1,
    };
  },
  components: {
    headerItem,
    messagesList,
  },
  methods: {
    scrollToBottom() {
      setTimeout(() => {
        const scrollContainer = this.$refs.messages;
        const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
        if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }
      }, 201);
    },
    add() {
      const a = Math.random();
      this.feed.push({
        id: 1,
        author: 'Person',
        contents: `hi there${a}`,
        date: '16:30',
      });
      this.scrollToBottom();
    },
  },
};
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  };
</style>

<style lang="scss" module>
.uncle-vue-chat{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  .messages{
    padding: 0 10px;
    transition: all 0.5s;
    overflow: scroll;
    overflow-x: hidden;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    height: 360px;
  }
}
</style>

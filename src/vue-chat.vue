<template>
  <div :class="$style['uncle-vue-chat']">
    <header-item/>
    <div :class="$style.main">
      <div :class="$style.messages" ref="messages">
        <messages-list :feed="feed" :author-id="authorId"/>
      </div>
      <div :class="$style.container">
        <input-container @newOwnMessage="onNewOwnMessage"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import headerItem from './components/header-item.vue';
import messagesList from './components/messages/messages-list.vue';
import inputContainer from './components/input/input-container.vue';

export default {
  name: 'VueChat',
  data() {
    return {
      feed: [{
        id: 0,
        author: 'Person',
        contents: 'hi there',
        date: '16:30',
        type: 'message',
      },
      {
        id: 1,
        author: 'Me',
        contents: 'hello至此,表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。表情插入功能的基本实现。 还没结束 上述例子中,在输入框中表情只能以文本的形式呈现。如果想在输入框中呈现输入的表情,该怎么',
        date: '16:30',
        type: 'message',
      },
      {
        id: 1,
        author: 'Me',
        contents: 'lol',
        date: '16:31',
        type: 'message',
      }],
      authorId: 1,
    };
  },
  components: {
    headerItem,
    messagesList,
    inputContainer,
  },
  methods: {
    scrollToBottom() {
      setTimeout(() => {
        const scrollContainer = this.$refs.messages;
        const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
        if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }
      }, 201);
    },
    onNewOwnMessage(message, type = 'message') {
      const newOwnMessage = {
        id: this.authorId,
        author: 'Me',
        contents: message,
        date: moment().format('HH:mm:ss'),
        type,
      };
      this.feed.push(newOwnMessage);
      this.scrollToBottom();
    },
  },
};
</script>
<style lang="scss" module>
.uncle-vue-chat{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  width: 50%;
  margin: 0 auto;
  .main{
    border: 1px solid #e9e9e9;
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
}
</style>

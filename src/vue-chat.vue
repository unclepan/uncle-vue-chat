<template>
  <div :class="$style['uncle-vue-chat']">
    <header-item>
      <template slot="but">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-minus"></use>
        </svg>

        <!-- <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-fullscreen-exit"></use>
        </svg> -->

        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </template>
    </header-item>
    <div :class="$style.messages" ref="messages">
      <list :feed="feed" :author-id="authorId"/>
    </div>
    <container @newOwnMessage="onNewOwnMessage"/>
  </div>
</template>

<script>
import './assets/iconfont/iconfont';
import moment from 'moment';
import headerItem from './components/header-item.vue';
import list from './components/messages/list.vue';
import container from './components/input/container.vue';

export default {
  name: 'VueChat',
  props: {
    feedList: {
      type: Array,
      default() {
        return [];
      },
    },
    author: {
      type: Number,
    },
  },
  data() {
    return {
      feed: this.feedList,
      authorId: this.author,
    };
  },
  components: {
    headerItem,
    list,
    container,
  },
  methods: {
    ss() {
      console.log('ss');
    },
    scrollToBottom() {
      setTimeout(() => {
        const scrollContainer = this.$refs.messages;
        const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
        if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }
      }, 201);
    },
    onNewOwnMessage(message, type = 'message') {
      const newOwnMessage = {
        key: this.feed.length,
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

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

<style lang="scss" module>
.uncle-vue-chat{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  display: flex;
  flex-direction:column;
  width: 560px;
  height: 560px;
  margin: 0 auto;
  .messages{
    padding: 0 10px;
    transition: all 0.5s;
    overflow: scroll;
    overflow-x: hidden;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex: 1;
    border-right: 1px solid #e9e9e9;
    border-left: 1px solid #e9e9e9;
  }
}
</style>

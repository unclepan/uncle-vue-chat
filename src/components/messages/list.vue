<template>
  <transition-group name="messages-list" tag="div">
    <div
      v-for="(item) in feed"
      :key="item.key"
      class="messages-list-item"
      :class="$style['messages-item']">
        <item :message="item" :authorId="authorId"/>
    </div>
  </transition-group>
</template>

<script>
import item from './item.vue';

export default {
  name: 'MessagesList',
  components: {
    item,
  },
  props: {
    feed: {
      type: Array,
      default() {
        return [];
      },
      required: false,
    },
    authorId: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};
</script>

<style>
.messages-list-item {
  transition: all 0.2s;
}
.messages-list-enter, .messages-list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.messages-list-leave-active {
  position: absolute;
}
</style>

<style lang="scss" module>
  .messages-item{
    margin: 20px 0;
  }
</style>

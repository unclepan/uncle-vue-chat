<template>
  <transition-group name="messages-list" tag="div">
    <div
      v-for="(item, index) in feed"
      :key="index"
      class="messages-list-item"
      :class="$style['messages-item']">
        <message-own v-if="item.id === authorId" :message="item" />
        <message-foreign v-else :message="item"/>
    </div>
  </transition-group>
</template>

<script>
import messageOwn from './message-own.vue';
import messageForeign from './message-foreign.vue';

export default {
  name: 'MessagesList',
  components: {
    messageOwn,
    messageForeign,
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
.messages-list-enter, .messages-list-leave-to
/* .messages-list-leave-active below version 2.1.8 */ {
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

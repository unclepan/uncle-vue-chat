<template>
  <div
    :class="$style['message-foreign']">
    <div :class="$style.head">
      {{message.author[0]}}
    </div>
    <img
      v-if="message.type === 'image'"
      :src="message.imageUrl"
      alt=""
      style="width: 100%">
    <span
      v-if="message.type === 'emoji'"
      :class="$style.emoji">
      {{ message.contents }}
    </span>
    <span
      v-if="message.type === 'message'"
      :class="$style.message">
      {{ message.contents }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'MessageForeign',
  props: {
    message: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" module>
.message-foreign{
  display: flex;
  justify-content: start;
  .head{
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    background: #eeeeee;
    margin-right: 10px;
  }
  .emoji{
    font-size: 42px;
    line-height: 46px;
  }
  .message{
    color: #556d7a;
    line-height: 21px;
    border-radius: 12px 4px;
    background-color: #e3ebfb;
    padding: 10px;
    max-width: 60%;
  }

}
</style>

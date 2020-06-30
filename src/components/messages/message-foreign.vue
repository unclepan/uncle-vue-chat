<template>
  <div
    :class="$style['message-foreign']">
    <div :class="$style.head">
      {{message.author[0]}}
    </div>
    <div :class="$style['message-contents']">
      <img
        v-if="message.imageUrl"
        :src="message.imageUrl"
        alt=""
        style="width: 100%" >
        {{ message.contents }}
    </div>
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
  .message-contents{
    border-radius: 4px 12px ;
    color: #556d7a;
    background-color: #e3ebfb;
    padding: 10px;
    line-height: 20px;
    max-width: 60%;
  }

}
</style>

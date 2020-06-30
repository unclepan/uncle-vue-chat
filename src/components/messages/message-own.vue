<template>
  <div :class="$style['message-own']">
    <div :class="$style['message-contents']">
      <img
        v-if="message.imageUrl"
        :src="message.imageUrl"
        alt=""
        style="width: 100%">
      {{ message.contents }}
     </div>
    <div :class="$style.head">
      {{message.author[0]}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageOwn',
  components: {
  },
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
.message-own{
  display: flex;
  justify-content: flex-end;
  .message-contents{
    border-radius: 12px 4px;
    color: #556d7a;
    background-color: #d8faf5;
    padding: 10px;
    line-height: 20px;
    max-width: 60%;
  }
  .head{
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    background: #eeeeee;
    margin-left: 10px;
  }
}
</style>

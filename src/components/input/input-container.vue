<template>
  <div :class="$style['input-container']">
    <emoji :on-emoji-picked="handleEmojiPicked"/>
    <input-field v-model="message" @newOwnMessage="onNewOwnMessage" />
    <div :class="$style.send">
      <send-button @newOwnMessage="onNewOwnMessage" />
    </div>

  </div>
</template>

<script>
import emoji from '../emoji/index.vue';
import inputField from './input-field.vue';
import sendButton from './send-button.vue';

export default {
  name: 'InputContainer',
  components: {
    emoji,
    inputField,
    sendButton,
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    handleEmojiPicked(val) {
      this.$emit('newOwnMessage', val, 'emoji');
    },
    onNewOwnMessage() {
      if (!this.message) return;
      this.$emit('newOwnMessage', this.message);
      this.message = '';
    },
  },
};
</script>

<style lang="scss" module>
.input-container{
  border-top: 1px solid #e9e9e9;
  padding: 10px;
  .send{
    display: flex;
    justify-content: flex-end;
  }
}
</style>

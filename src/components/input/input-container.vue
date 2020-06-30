<template>
  <div :class="$style['input-container']">
    <div :class="$style.bar">
      <emoji :on-emoji-picked="handleEmojiPicked"/>
      <file :on-file-upload="handleFileUpload"/>
    </div>
    <input-field v-model="message" @newOwnMessage="onNewOwnMessage" />
    <div :class="$style.send">
      <send-button @newOwnMessage="onNewOwnMessage" />
    </div>

  </div>
</template>

<script>
import emoji from '../emoji/index.vue';
import file from '../file/index.vue';
import inputField from './input-field.vue';
import sendButton from './send-button.vue';

export default {
  name: 'InputContainer',
  components: {
    emoji,
    file,
    inputField,
    sendButton,
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    handleFileUpload(val) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          if (typeof reader.result === 'string') {
            this.$emit('newOwnMessage', reader.result, 'image');
          } else {
            const blob = new Blob([reader.result]);
            const url = window.URL.createObjectURL(blob);
            this.$emit('newOwnMessage', { url, name: val.name }, 'file');
          }
        },
        false,
      );
      if (val) {
        if (/\.(jpe?g|png|gif)$/i.test(val.name)) {
          reader.readAsDataURL(val);
        } else {
          reader.readAsArrayBuffer(val);
        }
      }
    },
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
  .bar{
    display: flex;

  }
  .send{
    display: flex;
    justify-content: flex-end;
  }
}
</style>

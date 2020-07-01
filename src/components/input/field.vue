<template>
  <div :class="$style['input-field']">
    <input
      :value="value"
      type="text"
      name="message"
      aria-placeholder="请输入消息..."
      placeholder="请输入消息..."
      autofocus
      @input="$emit('input', $event.target.value)"
      @keyup.enter.prevent="send"><br>
  </div>

</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
  methods: {
    send() {
      this.$emit('newOwnMessage');
    },
  },
};
</script>

<style lang="scss" module>
  .input-field{
    padding: 10px 0;
    margin-right: 5px;
    border-radius: 12px;
    input {
      font-size: 14px;
      line-height: 21px;
      border: none;
      background-color: inherit;
      color: #666666;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
</style>

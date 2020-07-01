<template>
  <div
    :class="$style['send-button']"
    @click="send">
    <svg class="icon svg-icon" aria-hidden="true">
      <use xlink:href="#icon-send"></use>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'InputButton',
  methods: {
    send() {
      this.$emit('newOwnMessage');
    },
  },
};
</script>

<style lang="scss" module>
.send-button{
  cursor: pointer;
  background:#5680fa;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0px 0px 7px 2px rgba(148, 149, 150, 0.2);
}
</style>

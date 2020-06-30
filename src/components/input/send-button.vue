<template>
  <div
    :class="$style['send-button']"
    @click="send">
    <span class="icon iconfont icon-send"></span>
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

<template>
  <div :class="$style.header">
    <p>小恶魔</p>
    <div>
      <span class="icon iconfont icon-minus"></span>
      <span class="icon iconfont icon-fullscreen-exit"></span>
      <span class="icon iconfont icon-close"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
};
</script>

<style lang="scss" module>
  .header{
    padding: 16px 10px;
    background: #39509d;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
  }
</style>

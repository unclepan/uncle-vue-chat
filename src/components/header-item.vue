<template>
  <div :class="$style.header">
    <p>明日青年</p>
    <div>
      <slot name="but"></slot>
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

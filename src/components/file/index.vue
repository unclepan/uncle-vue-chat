<template>
  <div :class="$style.file">
    <input type="file" @change="handleFileUpload" @click="handleClick" />
    <span class="icon iconfont icon-attachment"></span>
  </div>
</template>

<script>
export default {
  props: {
    onFileUpload: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  methods: {
    handleClick(e) {
      e.target.value = null;
    },
    handleFileUpload(e) {
      this.onFileUpload(e.target.files[0]);
    },
  },
};
</script>

<style lang="scss" module>
.file{
  position: relative;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  overflow: hidden;
  :global(.icon){
    color: #949596;
    font-size: 20px;
  }
  input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    opacity: 0;
  }
}
</style>

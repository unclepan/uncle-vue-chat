<template>
  <div :class="$style.emoji">
    <picker
      v-if="isActive"
      :on-emoji-picked="onEmojiPicked"
      :on-blur="handlePickerBlur"
      />

    <span
      class="icon iconfont icon-smile"
      @click.prevent="openPicker">
    </span>
  </div>
</template>

<script>
import picker from './picker.vue';

export default {
  components: {
    picker,
  },
  props: {
    onEmojiPicked: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    openPicker() {
      this.isActive = true;
    },
    handlePickerBlur() {
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss" module>
.emoji{
  position: relative;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  :global(.icon){
    color: #949596;
    font-size: 20px;
  }
}
</style>

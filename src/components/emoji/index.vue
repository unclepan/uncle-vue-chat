<template>
  <div :class="$style.emoji">
    <picker
      v-if="isActive"
      :on-emoji-picked="onEmojiPicked"
      :on-blur="handlePickerBlur"
      />

    <span @click.prevent="openPicker">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-smile"></use>
      </svg>
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

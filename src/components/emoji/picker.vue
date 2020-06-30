<template>
  <div ref="domNode" tabIndex="0" :class="$style['picker']" @blur="onBlur">
    <div :class="$style['picker-content']">
      <div v-for="category in emojiData" :key="category.name" :class="$style['picker-category']">
        <div :class="$style['picker-category-title']">{{ category.name }}</div>
        <span
          v-for="emoji in category.emojis"
          :key="emoji"
          :class="$style['picker-emoji']"
          @click="emojiClicked(emoji)">
          {{ emoji }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import emojiData from './data';

export default {
  props: {
    onBlur: {
      type: Function,
      required: true,
    },
    onEmojiPicked: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      emojiData,
    };
  },
  mounted() {
    const elem = this.$refs.domNode;
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 350ms';
      elem.style.opacity = 1;
    });
    this.$refs.domNode.focus();
  },
  methods: {
    emojiClicked(emoji) {
      this.onEmojiPicked(emoji);
      this.$refs.domNode.blur();
    },
  },
};
</script>

<style lang="scss" module>
  .picker {
    position: absolute;
    bottom: 50px;
    left: 0px;
    width: 340px;
    max-height: 220px;
    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
    background: white;
    border-radius: 10px;
    outline: none;
    &:after {
      content: '';
      width: 14px;
      height: 14px;
      background: white;
      position: absolute;
      bottom: -6px;
      left: 10px;
      transform: rotate(45deg);
      border-radius: 2px;
    }
    .picker-content {
      padding: 10px;
      overflow: auto;
      width: 100%;
      max-height: 200px;
      box-sizing: border-box;
    }
    .picker-category {
      display: flex;
      flex-wrap: wrap;
    }
    .picker-category-title {
      min-width: 100%;
      color: #b8c3ca;
      font-weight: 200;
      font-size: 13px;
      margin: 10px;
      letter-spacing: 1px;
    }
    .picker-emoji {
      margin: 5px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      vertical-align: middle;
      font-size: 26px;
      transition: transform 60ms ease-out;
      &:hover {
        transform: scale(1.4);
      }
    }
  }
</style>

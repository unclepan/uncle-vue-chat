<template>
  <div
    :class="$style.item"
    :style="{
      justifyContent: message.id !== authorId ? 'flex-start' : 'flex-end'
    }">
    <div
      :class="$style['foreign-head']"
      v-if="message.id !== authorId">
      {{message.author[0]}}
    </div>

    <a
      v-if="message.type === 'file'"
      :href="message.contents.url"
      :download="message.contents.name"
      :class="$style.file">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-attachment"></use>
      </svg>
      {{message.contents.name}}
    </a>

    <img
      v-if="message.type === 'image'"
      :src="message.contents"
      :class="$style.image">

    <span
      v-if="message.type === 'emoji'"
      :class="$style.emoji">
      {{ message.contents }}
    </span>

    <span
      v-if="message.type === 'message'"
      :class="message.id === authorId ? $style['own-message']: $style['foreign-message']">
      {{ message.contents }}
    </span>

    <div
      :class="$style['own-head']"
      v-if="message.id === authorId">
      {{message.author[0]}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  components: {
  },
  props: {
    message: {
      type: Object,
      default() {
        return {};
      },
    },
    authorId: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};
</script>

<style lang="scss" module>
.item{
  display: flex;
  .file{
    text-decoration: none;
    line-height: 20px;
    border-radius: 12px;
    background-color: #efefef;
    padding: 10px;
    max-width: 60%;
    color: #39509d;
    &:hover{
      color: #5680fa;
    }
  }
  .image{
    width: 20%;
    max-width: 100px;
  }
  .emoji{
    font-size: 42px;
    line-height: 50px;
  }

  @mixin message{
    color: #556d7a;
    line-height: 20px;
    border-radius: 12px 4px;

    padding: 10px;
    max-width: 60%;
  }
  .foreign-message{
    @include message;
    background-color: #e3ebfb;

  }
  .own-message{
    @include message;
    background-color: #d8faf5;

  }
  @mixin head{
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    background: #eeeeee;
  }
  .foreign-head{
    @include head;
    margin-right: 10px;
  }
  .own-head{
    @include head;
    margin-left: 10px;
  }
}
</style>

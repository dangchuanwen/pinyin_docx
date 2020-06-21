<template>
  <div
    class="word-display"
    ref="wordDisplay"
    v-if="wordList && wordList.length > 0"
  >
    <ul class="word-list">
      <li class="word-item" v-for="item in wordList" :key="item">
        <span class="word">{{ item }}</span>
        <span class="iconfont icon-quxiao" @click="deleteWord(item)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WordDisplay",
  props: {
    wordList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      height: null
    };
  },
  methods: {
    deleteWord(word) {
      this.$emit("deleteWord", word);
    },
    scrollToBottom() {
      const wordDisplayDom = this.$refs.wordDisplay;
      if (!this.height) {
        this.height = wordDisplayDom.offsetHeight;
      }
      wordDisplayDom.scrollTo(0, this.height);
    }
  }
};
</script>

<style lang="less" scoped>
.word-display {
  box-sizing: border-box;
  margin-top: 2vw;
  padding: 0vw 2vw;
  width: 100vw;
  height: 60vw;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 1vw 0vw 5vw #888888;
  .word-list {
    padding-bottom: 5vw;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    .word-item {
      position: relative;
      margin-top: 10vw;
      padding: 0 2vw;
      .word {
        border-radius: 1vw;
        margin-right: 1vw;
        padding: 1vw 1vw;
        background: ghostwhite;
      }
      .icon-quxiao {
        position: absolute;
        right: 1vw;
        top: -3vw;
        font-size: 4vw;
        color: darkorange;
      }
    }
  }
}
</style>

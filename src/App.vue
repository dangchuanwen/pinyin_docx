<template>
  <div id="app">
    <h1 class="title">生成拼音Word文档</h1>
    <word-input @addNewWord="addNewWord"></word-input>
    <span>词汇数目：{{ wordList.length }}</span>
    <p class="download" v-if="ifFinish">
      下载：<a :href="downloadLink" v-if="downloadLink !== '#'">拼音.docx</a>
    </p>
    <word-display
      :wordList="wordList"
      @deleteWord="deleteWord"
      ref="wordDisplay"
    ></word-display>
    <button class="submit-button" @click="submit">立即转换</button>
    <waiting-cover
      v-if="ifWaitingCover"
      :tipContent="tipContent"
    ></waiting-cover>
  </div>
</template>

<script>
import WordInput from "./components/WordInput";
import WordDisplay from "./components/WordDisplay";
import WaitingCover from "./components/WaitingCover";
import axios from "axios";

export default {
  name: "App",
  components: {
    WordInput,
    WordDisplay,
    WaitingCover
  },
  data() {
    return {
      wordList: [],
      ifWaitingCover: false,
      ifFinish: false,
      downloadLink: "#",
      tipContent: ""
    };
  },
  methods: {
    addNewWord(store) {
      this.wordList = store;
      this.$nextTick(() => {
        const wordDisplay = this.$refs.wordDisplay;
        wordDisplay.scrollToBottom();
      });
    },
    deleteWord(word) {
      const index = this.wordList.findIndex(item => item === word);
      this.wordList.splice(index, 1);
    },
    submit() {
      this.ifWaitingCover = true;
      // 先进行排序，长的在后面
      const list = [...this.wordList];
      list.sort((a, b) => {
        return a.length - b.length;
      });
      axios
        .post("/api", {
          word_list: JSON.stringify(list)
        })
        .then(res => {
          if (res && res.data && res.data.data) {
            const docxLink = res.data.data.href;
            this.ifFinish = true;
            this.ifWaitingCover = false;
            this.downloadLink = docxLink;
          } else {
            this.tipContent = "转换失败...";
          }
        });
    }
  }
};
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 2vw;
    font-size: 5vw;
  }
  .download {
    margin: 4vw 0;
  }
  .submit-button {
    outline: none;
    border: none;
    border-radius: 1vw;
    margin-top: 10vw;
    width: 20vw;
    height: 10vw;
    color: white;
    font-size: 4vw;
    background: firebrick;
    &:active {
      background: black;
    }
  }
}
</style>

<template>
  <div class="word-input">
    <input
      type="text"
      ref="input"
      @keyup.enter="addNewWord"
      class="input"
      v-model="wordValue"
    />
    <button class="add-button" @click="addNewWord">添加</button>
  </div>
</template>

<script>
export default {
  name: "WordInput",
  data() {
    return {
      wordValue: "",
      store: []
    };
  },
  methods: {
    addNewWord() {
      const newWord = this.wordValue;
      this.wordValue = "";
      if (!newWord) {
        return;
      }
      if (!this.store.includes(newWord)) {
        this.store.push(newWord);
        this.$emit("addNewWord", this.store);
        this.$refs.input.focus();
      } else {
        alert("请不要重复添加！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.word-input {
  margin-top: 4vw;

  width: 100vw;
  height: 20vw;

  display: flex;
  justify-content: center;
  align-items: center;

  .input {
    outline: none;
    border: 1vw solid darkcyan;
    padding: 1vw;
    border-radius: 2vw;
    width: 50vw;
    height: 8vw;
  }

  .add-button {
    outline: none;
    border: none;
    border-radius: 1vw;
    margin-left: 2vw;
    width: 20vw;
    height: 10vw;
    color: white;
    font-size: 4vw;
    background: darkcyan;
    &:active {
      background: black;
    }
  }
}
</style>

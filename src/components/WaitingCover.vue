<template>
  <div class="waiting-cover">
    <span>正在生成拼音文档</span>
    <span>{{ ellipsis }}</span>
  </div>
</template>

<script>
export default {
  name: "WaitingCover",
  data() {
    return {
      ellipsis: "."
    };
  },
  mounted() {
    const timer = setInterval(() => {
      let ellipsiCount = this.ellipsis.length + 1;
      if (ellipsiCount === 4) {
        ellipsiCount = 1;
      }
      this.ellipsis = new Array(ellipsiCount).fill(".").join("");
    }, 500);
    this.$once("hook:beforeDestroy", () => clearInterval(timer));
  }
};
</script>

<style lang="less" scoped>
.waiting-cover {
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  span {
    display: block;
    min-width: 5vw;
    margin-bottom: 20vw;
    color: white;
  }
}
</style>

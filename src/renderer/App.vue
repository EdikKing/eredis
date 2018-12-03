<template>
  <div id="app">
    <div class="title win-drag">
      <span class="title-text">ERedis</span>
    </div>
    <div class="app-cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'eredis'
    }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    /*font-family: 'Source Sans Pro', sans-serif;*/
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important;
  }

  .win-drag {
    -webkit-app-region: drag
  }

  .no-drag {
    -webkit-app-region: no-drag
  }

  #app {
    height: 100vh;
    max-height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
    .title {
      height: 22px;
      background-color: #f6f6f6;
      user-select: none;
      text-align: center;
      .title-text {
        line-height: 22px;
      }
    }
    .app-cont {
      flex: 1;
      display: flex;
    }
  }
</style>

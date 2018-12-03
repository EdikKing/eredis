<style lang="scss">
  .home {
    height: 100vh;
    /*background: #f5f5f4;*/
    background: #fff;
    /*background: radial-gradient(*/
    /*ellipse at top left,*/
    /*rgba(255, 255, 255, 1) 60%,*/
    /*rgba(229, 229, 229, .9) 100%*/
    /*);*/
    .left, .right {
      display: flex;
      flex-direction: column;
      .top {
        height: 44px;
        border-bottom: 1px #ddd solid;
      }
      .main {
        flex: 1;
      }
    }
    .left {
      width: 260px !important;
      border-right: 1px #ddd solid;
      .top {
        display: flex;
        /*padding: 5px;*/
        justify-content: center;
        align-items: center;
        .db-out {
          flex: 1;
          padding: 0 5px;
        }
        .db-select {
          display: block;
        }
      }
      .main {
        .search {
          padding: 5px;
        }
      }
    }
    .right {

    }

  }

</style>
<template>
  <el-container class="home">
    <el-aside class="left">
      <div class="top">
        <div class="db-out">
          <el-select v-model="value" placeholder="请选择" size="small" class="db-select">
            <el-option v-for="item in 24" :key="item" :label="'DB'+item" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="main">
        <div class="search">
          <el-input size="small" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input8"></el-input>
        </div>
      </div>
    </el-aside>
    <el-main class="right">
      <div class="top">top</div>
      <div class="main">main</div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            };
        },
        mounted() {
        },
        methods: {}
    };
</script>
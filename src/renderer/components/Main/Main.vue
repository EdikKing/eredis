<style lang="scss">
  .home {
    /*height: 100vh;*/
    /*max-height: 100vh;*/
    /*overflow: hidden;*/
    /*background: #f5f5f4;*/
    flex: 1;
    display: flex;
    .left, .right {
      display: flex;
      flex-direction: column;
      .top {
        height: 40px;
        border-bottom: 0.5px #dbdbdb solid;
        user-select: none;
      }
      .main {
        flex: 1;
      }
    }

    .right {
      flex: 1;
      .top {
        background-color: #f6f6f6;
      }
      .main {
        font-size: 14px;
      }
    }

  }

</style>
<template>
  <div class="home">
    <Left></Left>
    <div class="right">
      <div class="top win-drag"></div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import redis from 'redis'
    import {mapMutations} from 'vuex'

    import Left from './Left/Left'
    import Editor from './Editor/Editor'

    export default {
        name: 'home',
        components: {Left, Editor},
        data() {
            return {};
        },
        mounted() {
            console.log('main-mounted')
            console.log(RedisClient)
            this._initClient()
        },
        methods: {
            ...mapMutations({
                setClient: 'SET_CLIENT'
            }),
            _initClient() {
                RedisClient = redis.createClient({
                    host: '127.0.0.1',
                    port: 6379,
                    db: 0
                })
            }
        }
    };
</script>
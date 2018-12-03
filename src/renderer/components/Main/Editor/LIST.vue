<style lang="scss">
  .editor {
    width: 100%;
    height: 100%;
    .textarea {
      width: 100%;
      height: 100%;
      border: 0px;
      resize: none;
      outline: #fff;
      padding: 5px;
    }
  }
</style>
<template>
  <div class="editor">
    <textarea class="textarea" v-text="cont"></textarea>
  </div>
</template>

<script>
    export default {
        name: 'list',
        components: {},
        data() {
            return {
                cont: ''
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.fetchData()
            })
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                let key = this.$route.params.key
                let type = this.$route.params.type

                if('LIST' == type){

                }
            },
            _getCont() {

            }
        }
    };
</script>
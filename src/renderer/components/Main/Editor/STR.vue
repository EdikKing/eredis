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
        name: 'str',
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

                if ('STR' == type) {
                    RedisClient.get(key, (err, re) => {
                        if (this.isJSON(re)) {
                            this.cont = re
                            this.cont = JSON.stringify(JSON.parse(re), null, '\t')
                        } else {
                            this.cont = re
                        }
                    })
                }
            },
            _getCont() {

            },
            isJSON(str) {
                if (typeof str == 'string') {
                    try {
                        var obj = JSON.parse(str);
                        if (typeof obj == 'object' && obj) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        // console.log('error：' + str + '!!!' + e);
                        return false;
                    }
                }
                console.log('It is not a string!')
            }
        }
    };
</script>
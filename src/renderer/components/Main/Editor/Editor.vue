<style lang="scss">
  .editor-wrapper {
    width: 100%;
    height: 100%;
  }
  .textarea {
    letter-spacing: 0.5px;
  }
</style>
<template>
  <!--<div class="editor-wrapper">-->
    <router-view></router-view>
  <!--</div>-->
</template>

<script>
    import redis from 'redis'

    export default {
        name: 'editor',
        components: {},
        data() {
            return {
                thisDB: 0,
                cont: '123'
            }
        },
        mounted() {
            this.$nextTick(()=>{
                console.log('editor-mounted')
                // console.log(this.$route.params)
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

                this.$router.push({name: type, params: this.$route.params})
            },
            _getCont() {

            }
        }
    };
</script>
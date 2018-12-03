<style lang="scss">
  .left {
    width: 260px !important;
    /*border-right: 0.5px #dbdbdb solid;*/
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
      .db-out {
        flex: 1;
        padding: 0 5px;
      }
      .db-select {
        display: block;
      }
    }
    .main {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-right: 0.5px #dbdbdb solid;
      .search {
        padding: 5px;
        height: 34px;
        box-sizing: border-box;
        background-color: #f6f6f6;
        border-right: 0.5px #dbdbdb solid;
      }
      .keys {
        flex: 1;
        overflow-y: auto;
        user-select: none;
        box-sizing: border-box;
        border-right: 0.5px #dbdbdb solid;
        &::-webkit-scrollbar-track{
          border-radius: 10px;
          border-color: red;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: red;
        }
        .keys-ul {
          display: block;
          .keys-li {
            height: 24px;
            cursor: pointer;
            /*&:nth-of-type(odd) {*/
            &:nth-of-type(even) {
              background-color: #f6f7f8;
            }
            &.active-line {
              /*background-color: #1b6fd3;*/
              background-color: #2d8cf0;
              /*background-color: #e5e5e5;*/
              color: #fff;
            }
            display: flex;
            .key-type {
              width: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              .key-type-v {
                width: 80%;
                height: 72%;
                background-color: #61c741;
                color: #fff;
                font-size: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 700;
                &.HASH {
                  background-color: #b769ce;
                }
                &.LIST {
                  background-color: #faa23b;
                }

              }
            }
            .key-value {
              flex: 1;
              display: flex;
              align-items: center;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="left">
    <div class="top win-drag">
      <div class="db-out">
        <Select v-model="thisDB" size="small" style="width:70px" class="no-drag">
          <Option v-for="(item,index) in 25" :value="index" :key="item">{{ 'DB'+index }}</Option>
        </Select>
        <Button size="small" type="primary" class="no-drag">刷新</Button>
        <Button size="small" type="info" class="no-drag">添加</Button>
      </div>
    </div>
    <div class="main">
      <div class="search">
        <!--<el-input size="small" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input8"></el-input>-->
        <Input prefix="ios-search" :clearable="true" size="small" placeholder="输入KEY进行搜索"/>
      </div>
      <div class="keys">
        <ul class="keys-ul">
          <li v-for="(item,index) in DBKeys" :key="item.key"
              @click="_checkKey(item,index)"
              @contextmenu.prevent="_checkKeyRight(item,index)"
              class="keys-li" :class="[activeKeysLine==index?'active-line':'']">
            <div class="key-type">
              <div class="key-type-v" :class="[item.type]" v-text="item.type"></div>
            </div>
            <div class="key-value" v-text="item.key"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    export default {
        name: 'left',
        data() {
            return {
                thisDB: 0,
                DBKeys: [],
                activeKeysLine: -1
            };
        },
        mounted() {
            this.$nextTick(()=>{
                console.log('left-mounted')

                this._getKeys()

                this._initKeyMenu()
            })
        },
        methods: {
            _checkKey(item, index) {
                console.log('checkKey')
                this.activeKeysLine = index
                this.$router.push({name: 'editor', params: item})
            },
            _checkKeyRight(item, index) {
                this.keyMenu.popup({window: remote.getCurrentWindow()})
            },
            _initKeyMenu() {
                const menu = new Menu()
                menu.append(new MenuItem({
                    label: '复制KEY', click() {
                        console.log('item 1 clicked')
                    }
                    // , checked: true
                }))
                menu.append(new MenuItem({
                    label: '刷新', click() {
                        console.log('item 1 clicked')
                    }
                }))
                menu.append(new MenuItem({
                    label: '设置过期时间', click() {
                        console.log('item 1 clicked')
                    }
                }))
                menu.append(new MenuItem({
                    label: '重命名', click() {
                        console.log('item 1 clicked')
                    }
                }))
                menu.append(new MenuItem({
                    label: '删除', click() {
                        console.log('item 1 clicked')
                    }
                }))
                this.keyMenu = menu
            },
            _getKeys() {
                let theKeys = new Promise((resolve, reject) => {
                    RedisClient.keys('*', (err, re) => {
                        if (err) return reject(err);
                        resolve(re);
                    })
                });

                theKeys.then(re => {
                    let keys = []
                    if (re && re.length > 0) {
                        for (let i = 0; i < re.length; i++) {
                            let key = re[i]
                            let newKey = {
                                key: key,
                                type: ''
                            }
                            this._getKeyType(key).then(re => {
                                // console.log(re)
                                if ('string' == re) {
                                    newKey.type = 'STR'
                                    // newKey.type = 'String'
                                } else if ('hash' == re) {
                                    newKey.type = 'HASH'
                                } else if ('list' == re) {
                                    newKey.type = 'LIST'
                                } else {
                                    newKey.type = re
                                }
                            })
                            keys.push(newKey)
                        }
                    }
                    this.DBKeys = keys
                    keys = null
                })

            },
            _getKeyType(key) {
                return new Promise((resolve, reject) => {
                    RedisClient.type(key, (err, re) => {
                        if (err) return reject(err);
                        resolve(re);
                    })
                });
            }
        }
    };
</script>
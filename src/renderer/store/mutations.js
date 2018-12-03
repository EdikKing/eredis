/**
 * Created by Edik on 2017/11/1.
 */
import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_CLIENT](state, client) {
        state.client = client
    }
}

export default mutations

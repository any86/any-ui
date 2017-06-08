import Vue from 'vue'
import Vuex from 'vuex'

// actions
import actions from './actions.js'

// 模块
import goodsModule from './modules/goods.js'

Vue.use(Vuex);
export default new Vuex.Store({
	// actions,
    modules: {
        goodsModule
    }
});


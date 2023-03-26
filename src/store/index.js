import {createStore} from 'vuex'

import state from "@/store/state";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import action from "@/store/action";

export default createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: action,
    modules: {

    }
})
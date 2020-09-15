import {
  getSpecs,getTotal
} from "@/request/specs"
export default {
  namespaced: true,
  state: {
    //   角色列表
    specslist: [],
    page: 1, // 页码数
    size: 10, // 每页数量
    total: 0 //总条数  
  },
  getters: {
    specslist: state => state.specslist,
    page: state => state.page,
    size: state => state.size,
    total: state => state.total
  },
  mutations: {
    SET_LIST(state, data) {
      state.specslist = data;
    },
    SET_PAGE(state, data) {
      state.page = data;
    },
    SET_SIZE(state, data) {
      state.size = data;
    },
    SET_TOTAL(state, data) {
      state.total = data;
    }
  },
  actions: {
    async get_specs_list({
      commit,state,dispatch
    }) {
      let res = await getSpecs(state.page,state.size);
      commit('SET_LIST', res)
      dispatch('get_specs_total')
    },
    // 获取总数
    async get_specs_total({commit}){
      let res = await getTotal();
      commit('SET_TOTAL',res)
    },
    set_page({commit,dispatch},data){
      commit('SET_PAGE',data)
      dispatch('get_specs_list')
    },
    set_size({commit,dispatch},data){
      commit('SET_SIZE',data)
      dispatch('get_specs_list')
    }
  }
}

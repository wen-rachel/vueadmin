import {
  getUser,getTotal,Login
} from "@/request/user"
import { Message } from "element-ui"
import router from "@/router"

let userinfo = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {};

export default {
  namespaced: true,
  state: {
    //   角色列表
    userlist: [],
    page:1,  //页码数
    size:1,   //每页个数
    total:0,  //总数
    userinfo:userinfo
  },
  getters: {
    userlist: state => state.userlist,
    page: state => state.page,
    size: state => state.size,
    total: state => state.total,
    menus:state => state.userinfo.menus,
    menus_url:state => state.userinfo.menus_url,
    username:state => state.userinfo.username
  },
  mutations: {
    SET_LIST(state, data) {
      state.userlist = data;
    },
    SET_PAGE(state, data) {
      state.page = data;
    },
    SET_SIZE(state, data) {
      state.size = data;
    },
    SET_TOTAL(state, data) {
      state.total = data;
    },
    QUIT(state,data){
      localStorage.removeItem('userinfo');
      state.userinfo = {}
      router.push("/login")
    },
    SET_USERINFO(state,data){
    // 为了实现持久化要存入本地存储
     localStorage.setItem("userinfo",JSON.stringify(data))
    //  存入vuex是为了方便各组件拿取数据
     state.userinfo = data;
    }
  },
  actions: {
    async get_user_list({
      commit,state,dispatch
    }) {
      let res = await getUser(state.page,state.size);
      commit('SET_LIST', res)
      // 请求数量
      dispatch('get_user_total')
    },
    async get_user_total({commit}){
      let res = await getTotal();
      commit('SET_TOTAL',res)
    },
    set_page({commit,dispatch},data){
      commit('SET_PAGE',data)
      dispatch('get_user_list')
    },
    set_size({commit,dispatch},data){
      commit('SET_SIZE',data)
      dispatch('get_user_list')
    },
    async login({commit},data){
      let res = await Login(data)
      if(res.code == 200){
        commit('SET_USERINFO',res.list)
      Message.success('success')
      // 跳转到后台首页
      router.push("/")

      }else{
        Message.error(res.msg)
      }
    }
  }
}

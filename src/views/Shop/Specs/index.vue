<template>
  <div class="table-bg">
    <el-button type="primary" @click="add">
      添加管理员
    </el-button>
    <v-list  @edit="edit"></v-list>
    <v-info :info="info" ref="dialog"></v-info>
  </div>
</template>
<script>
import VInfo from "./VInfo";
import VList from "./VList";
export default {
    data(){
        return{
          info:{ // 这是组件的info变量！
            isAdd:false,
            isShow:false
          }
        }
    },
    created(){},
    methods:{
      add(){
        this.info.isAdd =  this.info.isShow = true
      },
      edit(val){
        this.info.isAdd = false;
        this.info.isShow = true;
        // 调用弹框组件的setinfo方法！
        this.$refs.dialog.setinfo(val);
      }
    },
    components:{
      VList,VInfo
    }
}
</script>
<style scoped>
</style>
<template>
  <div class="header">
    <div class="lt">
        <el-button @click="TOGGLE"  v-if="iscollapse"  type="primary" size="small"  class="toggle-btn" icon="el-icon-s-unfold"></el-button>
      <el-button v-else @click="TOGGLE"  type="primary" size="small" class="toggle-btn" icon="el-icon-s-fold"></el-button>
      
      <el-breadcrumb separator="/" style="margin-left:20px" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          {{$route.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button icon="el-icon-back" size="small" circle v-if="$route.path != '/index'" @click="$router.back()"></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{username}}
          您好
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="togglescreenfull">
            <i class="el-icon-full-screen"></i> 全屏操作
          </el-dropdown-item>
          <el-dropdown-item @click.native="QUIT">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script> 
import {mapState,mapMutations,mapGetters} from "vuex"

import screenfull from 'screenfull'
export default {
  data() {
    return {
      isfull:false
    };
  },
  created() {},
  computed: {
     ...mapState(['iscollapse']),
     ...mapGetters({
       username:"user/username"
     })
 },
  methods: {
      ...mapMutations({
        TOGGLE:"TOGGLE",
        QUIT:"user/QUIT"
      }),
        togglescreenfull(){
        if (!screenfull.isEnabled) {
          this.$message.warning('您的浏览器不支持全屏')
          return false
        }
        this.isfull = !this.isfull
        screenfull.toggle()
      }
  },
  components: {},
};
</script>
<style scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.lt {
  display: flex;
  align-items: center;
}
.lt .mbx {
  margin: 0 20px;
}
</style>
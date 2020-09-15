<template>
  <el-row class="login-bg">
    <el-col :span="8" class="login-box">
      <h3>小U商城管理系统</h3>
      <el-form :model="forminfo" ref="form" :rules="rules">
        <el-form-item>
          <el-input v-model="forminfo.username" placeholder="请输入账号">
            <template slot="prepend" prop="username">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="forminfo.password" placeholder="请输入密码" show-password>
            <template slot="prepend">
              <i class="el-icon-ice-tea"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  data() {
    return {
      forminfo: {
        username: "憨憨",
        password: "123456",
      },
       rules: {
        // 验证规则对象！
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions({
      login:"user/login"
    }),
    // 提交
    submit(){
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.form.validate(valid=>{
        if(valid){
            this.login(this.forminfo)
        }
      })
    },
  },
  components: {},
};
</script>
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: pink;
}
.login-box {
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding: 20px 40px;
  border-radius: 5px;
  border: 1px solid #eee;
}
.login-box h3 {
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn{
  display: block;
  width: 100%;
}
</style>
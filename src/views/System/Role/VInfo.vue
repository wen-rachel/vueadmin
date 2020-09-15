<template>
  <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel" :visible.sync="info.isShow" width="40%">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          default-expend-all
          node-key="id"
          :check-strictly="checkStrictly"
          ref="tree"
          show-checkbox
          :props="{children:'children',label:'title'}"
          :data="menulist "
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 导入  添加和修改的 请求封装方法！
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
  status: 1, // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        rolename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      // false表示父子关联
      checkStrictly: false,
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  mounted() {
    console.log(this.menulist);
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list",
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      console.log(val);
      // 回显节点数据到树中
      let idarr = val.menus.split(",");
      if (idarr[0]) {
        // 回显
        this.checkStrictly = true;
        // 等到节点渲染完成再做某个事情
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false;
        });
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      // 获取树形控件
      // this.$refs.tree.getCheckedKeys()
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.forminfo.menus = idarr;
        console.log(idarr);
      } else {
        this.$message.warning("请选择权限");
        return;
      }

      // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过
          let res;
          if (this.info.isAdd) {
            // 添加还是修改
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list();
          this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
        // 添加时的重置
      if (this.info.isAdd) {
        this.forminfo = { ...defaultItem };
        this.$refs.tree.setCheckedKeys([]);
      } else {
        //   修改时的重置
        this.setinfo(...defaultItem);
      }
    },
    cancel(){
        this.$refs.tree.setCheckedKeys([]);
        this.forminfo = {...resetItem}
    }
  },
  components: {},
};
</script>
<style scoped>
</style>
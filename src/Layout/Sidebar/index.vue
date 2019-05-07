<template>
  <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 100%">
    <el-menu
        mode="vertical"
        :show-timeout="300"
        :default-active="$route.path"
        background-color="#222333"
        text-color="rgba(255,255,255,0.6)"
        :unique-opened="true"
        active-text-color="#e9524b"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
        menu-trigger="click"
    >
      <sidebar-item :collapse="collapse" :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  data () {
    return {
        collapse:true //水平浮动子菜单true  下拉子菜单false
    };
  },
  components: {
      SidebarItem
  },
  computed: {
      permission_routers(){
        return this.$router.options.routes
      }
  },
  mounted () {

  },
  methods: {
    handleOpen () {

    },
    handleClose () {}
  }
};
</script>
<style>

</style>

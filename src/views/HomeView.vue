<template>
  <div class="main-container">
    <div class="lay-out">
      <el-container>
        <el-aside class="aside">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true" :default-openeds="['/generate_doc']">
            <el-menu-item index="/generated_doc">
              <i class="el-icon-document"></i>
              <span slot="title">已生成文档</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">文档模板</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/general_template?tn=cover">封面模板</el-menu-item>
                <el-menu-item index="/general_template?tn=table">表格模板</el-menu-item>
                <el-menu-item index="/general_template?tn=doc">文本模板</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <h3>文档生成系统</h3>
          </el-header>
          <el-main class="main">
            <router-view name="table"></router-view>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isCollapse: true,
    }
  },

  methods:{
    refresh(){
      location.reload();
    }
  }
}
</script>

<style>
.aside {
  width: 200px;
  height: 100vh
}

.mian{
  width: 100%;
  height: 100vh;
}
</style>
<template>
  <div>
    <CreateNewDialog :dialog-visible="isVisible" @update:dialog-visible="handdleDialogVisible"></CreateNewDialog>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="name" label="文件名"></el-table-column>
      <el-table-column prop="enName" label="英文名"></el-table-column>
      <el-table-column prop="status" label="是否可操作"></el-table-column>
      <el-table-column prop="filePath" label="文件路径"></el-table-column>
      <el-table-column prop="createDate" label="文件创建日期"></el-table-column>
      <el-table-column prop="updateDate" label="文件修改日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="open_page_office(scope.row, '/doc_view')">查看</el-button>
          <el-button type="text" size="small" @click="open_page_office(scope.row,'/edit_doc')">编辑</el-button>
          <el-button type="text" size="small" @click="delete_file(scope.row)">删除</el-button>

          &emsp14;
          <!--下拉菜单-->
          <el-dropdown size="small" split-button type="text" trigger="click">
                        <span class="el-dropdown-link">
                            更多操作
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" size="small">文档生成</el-button>
                <el-button type="text" size="small">文档下载</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" class="cnbtn" @click="toggleDialog">新建模版</el-button>
  </div>
</template>

<script>
import {getTableDataRequest} from '@/js/api.js'
import {postRequestWithStringParm} from '@/js/api.js';
import CreateNewDialog from '../dialog/CreateNewDialogView.vue'
import axios from 'axios';
import qs from 'qs'

export default {
  components: {
    CreateNewDialog,
  },

  data() {
    return {
      tableData: [],
      isVisible: false,
      status_label: '',
    }
  },

  mounted() {
    this.get_table_data();
  },

  watch: {
    // 监听路由是否变化
    '$route'(to, from) {
      if (to.query.tn != from.query.tn) {
        this.tn = to.query.tn; // 把最新id赋值给定义在data中的id
        this.get_table_data(); // 重新调用加载数据方法
      }
    }

  },

  methods: {
    get_table_data() {
      const current_page = this.$route.query.tn;
      console.log(current_page)
      this.tableData = []

      if (current_page === 'cover') {
        this.get_covertemplate();
      } else if (current_page === 'table') {
        this.get_tabletemplate();
      } else if (current_page === 'doc') {
        this.get_doctemplate()
      }
    },

    get_doctemplate() {
      getTableDataRequest("doc/get_doc").then(response => {
        this.tableData = response.data.data
      })
    },

    get_covertemplate() {
      getTableDataRequest("doc/get_cover").then(response => {
        this.tableData = response.data.data
      })
    },

    get_tabletemplate() {
      getTableDataRequest("doc/get_table").then(response => {
        this.tableData = response.data.data
      })
    },

    toggleDialog() {
      this.isVisible = !this.isVisible;
    },

    handdleDialogVisible(value) {
      this.isVisible = value
    },

    delete_file(row) {
      const filePath = row.filePath;
      postRequestWithStringParm('doc/delete_file', filePath).then(
          response => {
            alert(response.data.msg)
            location.reload()
          }
      )
    },

    open_page_office(row, path) {
      const filePath = row.filePath;
      const url = "http://localhost:8080/#" + path;
      POBrowser.openWindow(url, 'width=1700px;height=1900px;', filePath)
    }
  }
}
</script>

<style>
.cnbtn {
  float: inline-end;
  margin-top: 20px;
  margin-right: 10px;
}
</style>
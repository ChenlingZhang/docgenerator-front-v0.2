<template>
  <div class="main-container">
    <div class="left-container">
      <el-collapse>
        <el-collapse-item title="可用模板标签">
          <el-table :data="template_tag">
            <el-table-column prop="name" label="书签名"></el-table-column>
            <el-table-column prop="caption" label="显示名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tag size="mini" @click="add_dataRegion(scope.row)" class="addRegionBtn">添加</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="right-container">
      <div style="width:auto; height:100%; position: relative" v-html="poHtmlCode"></div>
    </div>

  </div>
</template>

<script>
import {postRequestWithStringParm} from "@/js/api";

export default {
  data() {
    return {
      poHtmlCode: '',
      template_tag: [],
      used_template_tag: [],
    }
  },

  created: function () {
    const filePath = window.external.UserParams;
    console.log(filePath)
    postRequestWithStringParm("office/edit", filePath).then(response => {
      this.poHtmlCode = response.data;
    })
  },

  methods: {
    OnPageOfficeCtrlInit() {
      // PageOffice的初始化事件回调函数，您可以在这里添加自定义按钮
    },
    AfterDocumentOpened() {
      // PageOffice的文档打开后事件回调函数
      this.loadData();
    },
    BeforeDocumentSaved() {
      // PageOffice的文档保存前事件回调函数
    },
    AfterDocumentSaved() {
      // PageOffice的文档保存后事件回调函数
    },

    loadData() {
      this.template_tag = JSON.parse(pageofficectrl.word.DataRegionsDefinedAsJson);
    },

    add_dataRegion(row) {
      pageofficectrl.word.AddDataRegion(row.name, row.caption)
    }
  },
  mounted: function () {
    // 以下的为PageOffice事件的回调函数，名称不能改，否则PageOffice控件调用不到
    window.OnPageOfficeCtrlInit = this.OnPageOfficeCtrlInit;
    window.AfterDocumentOpened = this.AfterDocumentOpened;
    window.BeforeDocumentSaved = this.BeforeDocumentSaved;
    window.AfterDocumentSaved = this.AfterDocumentSaved;
  }
}
</script>

<style>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left-container {
  width: 30%;
  height: 100%;
}

.right-container {
  width: 70%;
  height: 100%;
}

.addRegionBtn:hover {
  cursor: pointer;
}
</style>
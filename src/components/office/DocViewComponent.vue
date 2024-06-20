<template>
  <div class="podiv">
    <div style="width:100%; height:100%; position: absolute" v-html="poHtmlCode" ></div>
  </div>
</template>

<script>
import axios from 'axios'
import {postRequestWithStringParm} from '@/js/api'

export default {
  data(){
    return {
      poHtmlCode: '',
    }
  },
  created: function(){
    const filePath = window.external.UserParams;
    // 请求后端项目打开文件的controller方法
    postRequestWithStringParm("office/view",filePath).then(response => {
      this.poHtmlCode = response.data;
    }).catch(function (erro) {
      console.log(erro)
    })
  },
  methods:{
    OnPageOfficeCtrlInit() {
      // PageOffice的初始化事件回调函数，您可以在这里添加自定义按钮
    },
    AfterDocumentOpened(){
      // PageOffice的文档打开后事件回调函数
    },
    BeforeDocumentSaved() {
      // PageOffice的文档保存前事件回调函数
    },
    AfterDocumentSaved() {
      // PageOffice的文档保存后事件回调函数
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
.podiv{
  position : absolute;
  width : 100%;
  height : 100%;
}
</style>
<template>
    <el-dialog title="新建文档模版" :visible.sync="localDialogVisible" width="40%" :before-close="handleClose">
        <el-form label-position="left" label-width="80px" :model="document">
            <el-form-item label="模版名称">
                <el-input v-model="document.name"></el-input>
            </el-form-item>

            <el-form-item label="模版英文名">
                <el-input v-model="document.enName"></el-input>
            </el-form-item>

            <el-form-item label="文件路径">
                <el-input placeholder="请输入内容" v-model="document.filePath" class="input-with-select"
                    style="margin-bottom: 15px;">
                    <el-select v-model="select" slot="prepend" placeholder="请选择" @change="onOptionChange">
                        <el-option label="封面模版" value="generator/templates/cover_templates/"></el-option>
                        <el-option label="表格模版" value="generator/templates/table_templates/"></el-option>
                        <el-option label="文档模版" value="generator/templates/doc_templates/"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>

            <el-form-item label="文件创建日期">
                <el-input v-model="document.createDate" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="文件修改日期">
                <el-input v-model="document.updateDate" :disabled="true"></el-input>
            </el-form-item>

            <el-button type="primary" size="small" @click="create_new_file">提交</el-button>
            <el-button type="warn" size="small" @click="handleClose">取消</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
import moment from 'moment';
import { postRequestForClass } from '@/js/api';

export default {
    props: ['dialogVisible'],

    select: '',

    data() {
        return {
            localDialogVisible: this.dialogVisible,

            document: {
                name: '',
                enName: '',
                filePath: '',
                createDate: '',
                updateDate: '',
            }
        };
    },

    watch: {
        dialogVisible(newVal) {
            this.localDialogVisible = newVal;
        }
    },

    mounted() {
        this.document.createDate = moment().format('YYYY-MM-DD HH:mm:ss')
        this.document.updateDate = moment().format('YYYY-MM-DD HH:mm:ss')
    },

    methods: {
        toggleDialog() {
            this.$emit('update:dialog-visible', !this.dialogVisible)
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.localDialogVisible = false;
                })
                .catch(_ => { });
        },

        onOptionChange(value) {
            const fileName = this.document.name;

            if(fileName!=null || fileName != undefined) {
                if(!fileName.includes(".docx")){
                    this.document.filePath = value+fileName+".docx";
                    return;
                }
                this.document.filePath=value+fileName
                return;
            }

            this.document.filePath = value;
        },

        create_new_file() {
            if (!this.document.filePath.includes(".docx")) {
                this.error_message_notification()
                return;
            }

            postRequestForClass('doc/create_new', this.document).then(response=>{
                if(response.data.code === 200){
                    this.localDialogVisible = false;
                    alert("文件创建成功")
                    location.reload()
                }
                else{
                    alert("文件创建失败")
                }
            })
            
        },

        error_message_notification() {
            const h = this.$createElement;

            this.$notify({
                title: '文件路径错误',
                message: h('i', { style: 'color: red' }, '文件路径输入错误，文件路径必须以.docx结尾')
            });
        }
    }
};
</script>
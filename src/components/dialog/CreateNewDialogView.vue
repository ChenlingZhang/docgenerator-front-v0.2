<template>
    <el-dialog title="新建文档模版" :visible.sync="localDialogVisible" width="40%" :before-close="handleClose">
        <el-form label-position="left" label-width="80px" :model="doc_info">
            <el-form-item label="模版名称">
                <el-input v-model="doc_info.name"></el-input>
            </el-form-item>

            <el-form-item label="模版英文名">
                <el-input v-model="doc_info.enName"></el-input>
            </el-form-item>

            <el-form-item label="文件路径">
                <el-input v-model="doc_info.filePath"></el-input>
            </el-form-item>

            <el-form-item label="文件创建日期">
                <el-input v-model="doc_info.createDate" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="文件修改日期">
                <el-input v-model="doc_info.updateDate" :disabled="true"></el-input>
            </el-form-item>

            <el-button type="primary" size="small">提交</el-button>
            <el-button type="warn" size="small" @click="handleClose">取消</el-button>
        </el-form>
    </el-dialog>
</template>

<script>
import moment from 'moment';

export default {
    props: ['dialogVisible'],

    data() {
        return {
            localDialogVisible: this.dialogVisible,

            doc_info: {
                name: '',
                enName: '',
                filePath: '',
                createDate: '',
                updateDate: '',
            }
        };
    },

    watch:{
        dialogVisible(newVal){
            this.localDialogVisible = newVal;
        }
    },

    mounted(){
        this.doc_info.createDate = moment().format('YYYY-MM-DD HH:mm:ss')
        this.doc_info.updateDate = moment().format('YYYY-MM-DD HH:mm:ss')
    },

    methods: {
        toggleDialog(){
            this.$emit('update:dialog-visible', !this.dialogVisible)
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.localDialogVisible = false;
                })
                .catch(_ => { });
        }
    }
};
</script>
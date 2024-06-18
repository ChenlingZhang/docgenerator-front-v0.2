<template>
    <div>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="enName" label="英文名"></el-table-column>
            <el-table-column prop="filePath" label="文件路径"></el-table-column>
            <el-table-column prop="createdDate" label="文件创建日期"></el-table-column>
            <el-table-column prop="updateDate" label="文件修改日期"></el-table-column>
            <el-table-column label="操作">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">下载文档</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                name: 'xxx',
                enName: 'xxx',
                filePath: 'xxxxx',
                createdDate: 'xxxx',
                updateDate: 'xxxx'
            }]
        }
    }
}
</script>
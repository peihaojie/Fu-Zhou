<template>
    <div id="systemInformation">
        <!-- 阴影框 -->
        <div class="shadow-box"></div>
        <!-- 侧导航栏 -->
        <div class="side-nav">
            <ul>
                <li class="button">
                    <router-link to="/systemHome" class="return"></router-link>
                </li>
            </ul>
            <!-- <div class="all">
                <a>
                    全部文件
                </a>
            </div> -->
            <div class="list-box">
                <el-collapse v-model="activeNames" accordion @change="handleChange">
                    <el-collapse-item :title="item.folderName" :name="item.folderName+' '+item.id" v-for="item in folderListData" :key="item.id">
                        <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item :title="item2.folderName" :name="item2.folderName+' '+item2.id" v-for="item2 in item.children" :key="item2.id">
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <el-collapse-item :title="item3.folderName" :name="item3.folderName+' '+item3.id" v-for="item3 in item2.children" :key="item3.id">
                                        <el-collapse v-model="activeNames" @change="handleChange">
                                            <el-collapse-item :title="item4.folderName" :name="item4.folderName+' '+item4.id" v-for="item4 in item3.children" :key="item4.id">
                                                <el-collapse v-model="activeNames" @change="handleChange">
                                                    <el-collapse-item :title="item5.folderName" :name="item5.folderName+' '+item5.id" v-for="item5 in item4.children" :key="item5.id">
                                                    </el-collapse-item>
                                                </el-collapse>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 内容 -->
        <div class="padding-box">
            <div class="content-box">
                <!-- 搜索栏 -->
                <div class="search-box">
                    <!-- 输入框 -->
                    <div class="input-box">
                        <input type="text" placeholder="请输入文件名" v-model="fileName">
                        <a class="el-icon-search" @click="searchClick"></a>
                    </div>
                    <!-- 按钮盒子 -->
                    <div class="botton-box">
                        <a @click="uploadingClick">上传</a>
                        <a @click="deleteFolder">删除</a>
                        <a @click="createShow=true">新建文件夹</a>
                    </div>
                </div>
                <!-- 表格 -->
                <div class="table-box">
                    <el-table
                    :data="tableData"
                    stripe
                    border>
                        <el-table-column
                        type="selection"
                        width="35">
                        </el-table-column>
                        <el-table-column
                        type="index"
                        label="序号"
                        width="60"
                        :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                        prop="fileName"
                        label="文件名">
                        </el-table-column>
                        <el-table-column
                        prop="fileSize"
                        label="大小">
                        <template slot-scope="scope">
                            {{scope.row.fileSize}}KB
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="uploadAccount"
                        label="上传者">
                        </el-table-column>
                        <el-table-column
                        prop="uploadTime"
                        label="上传时间">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <a class="table-button" @click="download(scope.row.fileUrl)">下载</a>
                            <span class="line">|</span>
                            <a class="table-button" @click="deleteFile(scope.row.id)">删除</a>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="paging-box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[15, 30, 45]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 创建文件夹 -->
        <div class="dialog-box" v-show="createShow">
            <div class="title">
                创建文件夹
                <a class="close" @click="createShow=false">
                    <i class="el-icon-close"></i>
                </a>
            </div>
            <div class="form">
                <ul>
                    <li>
                        <span>文件夹名：</span>
                        <input type="text" v-model="folderName">
                    </li>
                </ul>
            </div>
            <div class="confirm">
                <a class="button" @click="createFolder">确定</a>
            </div>
        </div>
        <!-- 上传文件 -->
        <div class="dialog-box" v-show="uploadingShow">
            <div class="title">
                上传文件
                <a class="close" @click="uploadingShow=false">
                    <i class="el-icon-close"></i>
                </a>
            </div>
            <div class="form">
                <ul>
                    <li>
                        <input type="file" @change="update" style="border:none;margin: 0 auto;width:auto;">
                    </li>
                </ul>
            </div>
            <div class="confirm">
                <a class="button" @click="uploadFile">确定</a>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="shade-box" v-show="createShow || uploadingShow"></div>
        <!-- 加载层 -->
        <div class="shade-box" v-loading="loading" v-show="loading" element-loading-text="正在上传，请勿关闭页面"></div>
    </div>
</template>

<style lang="less">
    #systemInformation {
        width: 100%;
        display: flex;
        background-color: #f7f7f7;
        .shadow-box {
            width: 100%;
            height: 0.15rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 20;
            box-shadow: 0 0.07rem 0.14rem -0.1rem #666 inset;
        }
        .side-nav {
            width: 3rem;
            height: 10rem;
            overflow: hidden;
            // display: inline-block;
            background-color: #54a4d7;
            >ul {
                width: 3rem;
                li {
                    height: .6rem;
                    position: relative;
                    a {
                        width: 100%;
                        height: .6rem;
                        color: #fff;
                        font-size: .2rem;
                        line-height: .6rem;
                        position: absolute;
                        transition: all .5s;
                        padding-left: .2rem;
                        border-bottom: .01rem solid #98c8e7;
                    }
                }
                .button {
                    position: relative;
                    border-bottom: .01rem solid #98c8e7;
                    a {
                        top: 50%;
                        left: 50%;
                        border: 0;
                        padding: 0;
                        width: .22rem;
                        height: .22rem;
                        position: absolute;
                        background-repeat: no-repeat;
                        transform: translate(-50%,-50%);
                        background-position: center center;
                        background-image: url('../../../../static/images/system-return.png');
                    }
                    a:hover {
                        background-color: #2d83bb;
                    }
                }
            }
            .all {
                a {
                    width: 3rem;
                    height: .6rem;
                    color: #fff;
                    font-size: .18rem;
                    display: inline-block;
                    border-bottom: .01rem solid #daebf7;
                    line-height: .59rem;
                    text-align: center;
                }
            }
            .list-box {
                .el-collapse {
                    border: none;
                    position: relative;
                    .el-collapse-item__header {
                        font-size: .18rem;
                        color: #fff;
                        background-color: #54a4d7;
                        border-bottom: 0;
                        height: .6rem;
                        padding: 0;
                        line-height: .59rem;
                        padding-left: .35rem;
                        border-bottom: .01rem solid #f2f8fc;
                        background-image: url('../../../../static/images/systemInformation-icon.png');
                        background-position: .16rem .22rem;
                    }
                    .el-collapse-item__content {
                        padding: 0;
                        >div {
                            background-color: #54a4d7;
                            a {
                                display: block;
                                color: #fff;
                                font-size: .12rem;
                                line-height: .3rem;
                            }
                        }
                    }
                    .el-collapse-item__wrap {
                        background-color: #54a4d7;
                        padding-left: .2rem;
                        border: none;
                        overflow: visible;
                        // height: auto;
                    }
                }
            }
        }
        .padding-box {
            flex: 1;
            padding-top: 0.3rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            .content-box {
                border-radius: .04rem;
                background-color: #fff;
                box-shadow: 0 0 .5rem -.3rem #666;
                .search-box {
                    height: .9rem;
                    position: relative;
                    padding-top: .2rem;
                    padding-left: .2rem;
                    border-bottom: .1rem solid #f7f7f7;
                    .input-box {
                        width: 4rem;
                        height: .4rem;
                        overflow: hidden;
                        padding-left: .18rem;
                        border-radius: .04rem;
                        display: inline-block;
                        border: .01rem solid #b6b6b6;
                        input {
                            width: 3.4rem;
                            height: .38rem;
                            font-size: .17rem;
                            &::placeholder {
                                color: #dadada;
                            }
                        }
                        a {
                            color: #ccc;
                            width: .38rem;
                            height: .38rem;
                            font-size: .18rem;
                            text-align: center;
                            line-height: .38rem;
                            transition: all .5s;
                            display: inline-block;
                            &:hover {
                                color: #fff;
                                background-color: #ccc;
                            }
                        }
                    }
                    .botton-box {
                        position: absolute;
                        right: .2rem;
                        top: .2rem;
                        a {
                            display: inline-block;
                            height: .4rem;
                            line-height: .38rem;
                            padding: 0 .3rem;
                            font-size: .18rem;
                            color: #a3a2a2;
                            background-color: #f0f0f0;
                            border-radius: .04rem;
                            border: .01rem solid #f0f0f0;
                            margin-left: .15rem;
                            transition: all .5s;
                            &:hover {
                                color: #fff;
                                background-color: #19b6fe;
                                border: .01rem solid #2e95c3;
                            }
                        }
                    }
                }
                .table-box {
                    min-height: 5.6rem;
                    padding-top: .2rem;
                    padding-left: .2rem;
                    padding-right: .2rem;
                    .el-table {
                        width: 15.11rem;
                        // width: 100%;
                        th {
                            padding: 0;
                            div {
                                color: #4a4a4a;
                                height: .35rem;
                                line-height: .35rem;
                                background-color: #c5e8ff;
                            }
                        }
                        td {
                            padding: 0;
                            div {
                                height: .35rem;
                                color: #646464;
                                line-height: .35rem;
                            }
                        }
                        .table-button {
                            color: #19b6fe;
                            padding: 0 .08rem;
                            text-decoration: underline;
                        }
                        .line {
                            color: #19b6fe;
                        }
                    }
                    .green-color {
                        color: #58de87 !important;
                    }
                    .red-color {
                        color: #fe898f !important;
                    }
                }
                .paging-box {
                    width: 100%;
                    height: .52rem;
                    margin-top: .2rem;
                    padding-right: .2rem;
                    padding-bottom: .2rem;
                    .el-pagination {
                        float: right;
                    }
                }
            }
        }
        .dialog-box {
            left: 50%;
            top: 2.14rem;
            z-index: 200;
            width: 6.84rem;
            overflow: hidden;
            position: absolute;
            border-radius: .1rem;
            transform: translate(-50%);
            background-color: #fefefe;
            .title {
                color:#fff;
                height: .6rem;
                font-size: .24rem;
                line-height: .6rem;
                text-align: center;
                position: relative;
                font-weight: bolder;
                background: linear-gradient(to right, #6cc4ff, #489cff);
                a {
                    top: 50%;
                    right: .2rem;
                    color: #fff;
                    position: absolute;
                    transform: translateY(-50%);
                }
            }
            .form {
                ul{
                    padding-bottom: .3rem;
                    li {
                        display: flex;
                        height: .71rem;
                        padding-top: .3rem;
                        >span {
                            width: 1.85rem;
                            height: .41rem;
                            font-size: .16rem;
                            text-align: right;
                            position: relative;
                            line-height: .41rem;
                            padding-right: .32rem;
                            display: inline-block;
                        }
                        input {
                            width: 3.66rem;
                            height: .41rem;
                            padding-left: .1rem;
                            border-radius: .02rem;
                            border: .01rem solid #b1b1b1;
                        }
                    }
                }
            }
            .confirm {
                height: .8rem;
                background-color: #f8f8f8;
                border-top: .01rem solid #dedede;
                .button {
                    color: #fff;
                    display: block;
                    width: 1.63rem;
                    height: .49rem;
                    margin: 0 auto;
                    font-size: .2rem;
                    margin-top: .15rem;
                    text-align: center;
                    line-height: .47rem;
                    transition: all .5s;
                    border-radius: .02rem;
                    background-color: #ffd14f;
                    border: .01rem solid #d9b759;
                    &:hover {
                        background-color: #d9b759
                    }
                }
            }
        }
        .shade-box {
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            height: 100%;
            position: fixed;
            background-color: rgba(0, 0, 0, .5);
        }
    }
</style>

<script>
export default {
    data() {
        return {
            projectId: '', // 项目id
            uploadAccount: '', // 当前账号
            activeNames: ['1'], // 当前所属层级
            tableData: [], // 表格数据
            pageNum: 1, // 当前页
            pageSize: 15, // 每页显示条数
            pageTotal: 1, // 总条数
            folderListData: [], // 文件夹列表
            folderName: '', // 新建文件夹的文件夹名
            parentLevel: 0, // 新建文件夹的父级id
            createShow: false, // 创建文件夹对话框状态
            uploadingShow: false, // 上传文件夹对话框状态
            loading: false, // 加载遮罩层
            folderId: 0, // 文件夹id
            fileName: '', // 文件名
            uploadFolderName: '', // 上传的文件夹名
            file: '', // 要上传的文件
            deleteIds: '', // 要删除的文件夹的id以及其子文件夹的id
        }
    },
    created() {
        this.getProjectId()
        this.folderList()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
            this.uploadAccount = sessionStorage.getItem('userAccount')
            // console.log(this.uploadAccount)
        },

        // 当前选中折叠面板层级
        handleChange(val) {
            // console.log(typeof(val))
            if (typeof(val) == 'string') {
                this.parentLevel = val.split(' ')[1]
                this.parentLevel = Number(this.parentLevel)
                this.uploadFolderName = val.split(' ')[0]
            } else {
                this.parentLevel = val[val.length-1].split(' ')[1]
                this.parentLevel = Number(this.parentLevel)
                this.uploadFolderName = val[val.length-1].split(' ')[0]
            }
            if (!this.parentLevel) {
                this.parentLevel = 0
            }
            this.folderId = this.parentLevel
            // console.log(this.parentLevel)
            // console.log(this.uploadFolderName)
            let temp = []
            let temp2 = ''
            for (let i1 = 0; i1 < this.folderListData.length; i1++) {
                if (this.folderId == this.folderListData[i1].id) {
                    temp.push(this.folderListData[i1].id)
                    for (let i2 = 0; i2 < this.folderListData[i1].children.length; i2++) {
                        temp.push(this.folderListData[i1].children[i2].id)
                        for (let i3 = 0; i3 < this.folderListData[i1].children[i2].children.length; i3++) {
                            temp.push(this.folderListData[i1].children[i2].children[i3].id)
                            for (let i4 = 0; i4 < this.folderListData[i1].children[i2].children[i3].children.length; i4++) {
                                temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].id)
                                for (let i5 = 0; i5 < this.folderListData[i1].children[i2].children[i3].children[i4].children.length; i5++) {
                                    temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id)
                                }
                            }
                        }
                    }
                }
                for (let i2 = 0; i2 < this.folderListData[i1].children.length; i2++) {
                    if (this.folderId == this.folderListData[i1].children[i2].id) {
                        temp.push(this.folderListData[i1].children[i2].id)
                        for (let i3 = 0; i3 < this.folderListData[i1].children[i2].children.length; i3++) {
                            temp.push(this.folderListData[i1].children[i2].children[i3].id)
                            for (let i4 = 0; i4 < this.folderListData[i1].children[i2].children[i3].children.length; i4++) {
                                temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].id)
                                for (let i5 = 0; i5 < this.folderListData[i1].children[i2].children[i3].children[i4].children.length; i5++) {
                                    temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id)
                                }
                            }
                        }
                    }
                    for (let i3 = 0; i3 < this.folderListData[i1].children[i2].children.length; i3++) {
                        if (this.folderId == this.folderListData[i1].children[i2].children[i3].id) {
                            temp.push(this.folderListData[i1].children[i2].children[i3].id)
                            for (let i4 = 0; i4 < this.folderListData[i1].children[i2].children[i3].children.length; i4++) {
                                temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].id)
                                for (let i5 = 0; i5 < this.folderListData[i1].children[i2].children[i3].children[i4].children.length; i5++) {
                                    temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id)
                                }
                            }
                        }
                        for (let i4 = 0; i4 < this.folderListData[i1].children[i2].children[i3].children.length; i4++) {
                            if (this.folderId == this.folderListData[i1].children[i2].children[i3].children[i4].id) {
                                temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].id)
                                for (let i5 = 0; i5 < this.folderListData[i1].children[i2].children[i3].children[i4].children.length; i5++) {
                                    temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id)
                                }
                            }
                            for (let i5 = 0; i5 < this.folderListData[i1].children[i2].children[i3].children[i4].children.length; i5++) {
                                if (this.folderId == this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id) {
                                    temp.push(this.folderListData[i1].children[i2].children[i3].children[i4].children[i5].id)
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < temp.length; i++) {
                if (i == temp.length-1) {
                    temp2+=(temp[i])
                } else {
                    temp2+=(temp[i]+',')
                }
            }
            // console.log(temp2)
            this.deleteIds = temp2
            this.getFileList()
        },

        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 每页条数切换
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.pageClick()
        },

        // 当前页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum = val
            this.pageClick()
        },

        // 获取文件夹列表
        folderList() {
            this.$axios.post(`/api/folder/folderList?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    this.folderListData = res.data.data
                }
            )
        },

        // 新建文件夹
        createFolder() {
            this.$axios.post(`/api/folder/createFolder?projectId=${this.projectId}&folderName=${this.folderName}&parentLevel=${this.parentLevel}`).then(
                res => {
                    // console.log(res.data)
                    this.createShow = false
                    this.folderList()
                }
            )
        },

        // 获取文件列表
        getFileList() {
            this.$axios.post(`/api/FileApi/getFileList?folderId=${this.folderId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 搜索
        searchClick() {
            this.pageNum = 1
            this.$axios.post(`/api/FileApi/getFileList?folderId=${this.folderId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&fileName=${this.fileName}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/FileApi/getFileList?folderId=${this.folderId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&fileName=${this.fileName}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 上传点击事件
        uploadingClick() {
            if (this.folderId == 0) {
                this.$message({
                    message: '请先选择文件夹',
                    type: 'warning'
                })
            } else {
                this.uploadingShow = true
            }
        },

        // 拿到要上传的文件
        update(e) {
            let file = e.target.files[0]
            this.file = new FormData() // 创建form对象
            this.file.append('file',file) // 向form对象添加数据
            // console.log(this.file.get('file'))
        },

        // 上传文件
        uploadFile() {
            this.loading = true
            this.uploadingShow = false
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/FileApi/uploadFile?folderId=${this.folderId}&projectId=${this.projectId}&uploadAccount=${this.uploadAccount}&folderName=${this.uploadFolderName}`,this.file,headers).then(
                res => {
                    // console.log(res.data)
                    if (res.data.code==0) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                    this.getFileList()
                    this.loading = false
                }
            )
        },

        // 删除文件
        deleteFile(ids) {
            // console.log(ids)
            this.$confirm('是否要删除选中的文件？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/FileApi/deleteFile?ids=${ids}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getFileList()
                        } else {
                            this.$message({
                                message: '删除失败，请重试',
                                type: 'error'
                            })
                        }
                    }
                )
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })         
            })
        },

        // 删除文件夹
        deleteFolder() {
            if (this.deleteIds) {
                this.$confirm('是否要删除选中的文件夹以及这个文件夹内的所有文件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(`/api/folder/removeFolder?ids=${this.deleteIds}`).then(
                        res => {
                            // console.log(res.data)
                            if (res.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.folderList()
                                this.getFileList()
                            } else {
                                this.$message({
                                    message: '删除失败，请重试',
                                    type: 'error'
                                })
                            }
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })         
                })
            } else {
                this.$message({
                    message: '请选择要删除的文件夹',
                    type: 'warning'
                })
            }
        },

        // 下载
        download(imgURL) {
            location.href=`http://47.106.71.3:8080/api/FileApi/download?imgURL=${imgURL}`
        },
    }
}
</script>

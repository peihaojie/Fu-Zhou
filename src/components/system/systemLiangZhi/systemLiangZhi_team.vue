<template>
    <div id="systemLiangZhi_team">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul>
                        <li>
                            <span>所属参建单位：</span>
                            <el-select clearable v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractor"
                                :key="item.id"
                                :label="item.constructionName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span class="margin">班组名称：</span>
                            <input type="text" v-model="searchTeamName">
                        </li>
                    </ul>
                </div>
                <a class="search-button" @click="searchClick">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <a class="new" @click="dialogClick">
                        <i class="icon"></i>
                        新增
                    </a>
                    <a class="compile" @click="compileClick">
                        <i class="icon"></i>
                        编辑
                    </a>
                    <a class="delete" @click="deleteClick">
                        <i class="icon"></i>
                        删除
                    </a>
                    <a class="derive" @click="deriveClick">
                        <i class="icon"></i>
                        导出Excel
                    </a>
                </div>
                <!-- 列表 -->
                <div class="table-box">
                    <el-table
                    :data="tableData"
                    stripe
                    border
                    @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="35">
                        </el-table-column>
                        <el-table-column
                        prop="number"
                        label="序号"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="班组名称"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="所属项目"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="contractorName"
                        label="所属参建单位"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="contractorNumber"
                        label="参建单位编号">
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
            <!-- 新增班组 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增班组
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                所属参建单位
                                <div class="required">*</div>
                            </span>
                            <el-select v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractor"
                                :key="item.id"
                                :label="item.constructionName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>
                                班组名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="teamName">
                        </li>
                        <li>
                            <span>备注</span>
                            <input type="text" v-model="remark">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="insertHjTeam">确定</a>
                </div>
            </div>
            <!-- 编辑班组 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    编辑班组
                    <a class="close" @click="compileShow = false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                所属参建单位
                                <div class="required">*</div>
                            </span>
                            <el-select v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractor"
                                :key="item.id"
                                :label="item.constructionName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>
                                班组名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="teamName">
                        </li>
                        <li>
                            <span>备注</span>
                            <input type="text" v-model="remark">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="updateHjTeam">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_team {
        width: 100%;
        .centent-box {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: .9rem;
                padding: 0 .2rem;
                border-bottom: .1rem solid #f7f7f7;
                .left-box {
                    float: left;
                    height: .8rem;
                    ul {
                        li {
                            float: left;
                            margin-right: .35rem;
                            .el-input {
                                height: .6rem;
                            }
                            span {
                                float: left;
                                height: .8rem;
                                font-size: .18rem;
                                line-height: .8rem;
                            }
                            input {
                                float: left;
                                width: 2.6rem;
                                height: .4rem;
                                margin-top: .2rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                vertical-align: middle;
                                border: .01rem solid #b6b6b6;
                            }
                        }
                    }
                }
                .search-button {
                    float: right;
                    color: #fff;
                    height: .4rem;
                    width: 1.63rem;
                    font-size: .2rem;
                    margin-top: .2rem;
                    text-align: center;
                    transition: all .5s;
                    line-height: .38rem;
                    border-radius: .02rem;
                    background-color: #ffd14f;
                    border: .01rem solid #d4ad40;
                    &:hover {
                        background-color: #d4ad40;
                    }
                }
            }
            .main-box {
                padding: .2rem .2rem .25rem .2rem;
                .button-box {
                    height: .3rem;
                    a {
                        float: left;
                        height: .3rem;
                        color: #0090ff;
                        font-size: .14rem;
                        transition: all .5s;
                        margin-right: .2rem;
                        line-height: .28rem;
                        border-radius: .02rem;
                        padding-right: .09rem;
                        border: .01rem solid #0090ff;
                        &:hover {
                            color: #fff;
                            background-color: #0090ff;
                        }
                        .icon {
                            width: .37rem;
                            height: .28rem;
                            transition: all .5s;
                            display: inline-block;
                            vertical-align: middle;
                            background-repeat: no-repeat;
                            background-position: center center;
                        }
                    }
                    .new {
                        .icon {
                            background-image: url('../../../../static/images/system-new.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-newHover.png');
                            }
                        }
                    }
                    .compile {
                        .icon {
                            background-image: url('../../../../static/images/system-compile.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-compileHover.png');
                            }
                        }
                    }
                    .delete {
                        .icon {
                            background-image: url('../../../../static/images/system-delete.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-deleteHover.png');
                            }
                        }
                    }
                    .derive {
                        .icon {
                            background-image: url('../../../../static/images/system-derive.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-deriveHover.png');
                            }
                        }
                    }
                }
                .table-box {
                    width: 100%;
                    margin-top: .2rem;
                    min-height: 5.6rem;
                    .el-table {
                        width: 16.28rem;
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
                    }
                }
                .paging-box {
                    width: 100%;
                    height: .32rem;
                    margin-top: .2rem;
                    .el-pagination {
                        float: right;
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
                                .required {
                                    top: -0.01rem;
                                    right: .22rem;
                                    color: #f00;
                                    position: absolute;
                                }
                            }
                            input {
                                width: 3.66rem;
                                height: .41rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                border: .01rem solid #b1b1b1;
                            }
                            .el-date-editor {
                                width: 3.66rem;
                                height: .41rem;
                                input {
                                    padding-left: .3rem;
                                }
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
    }
</style>

<script>
export default {
    data() {
        return {
            tableData: [], // 表格数据
            pageNum: 1, // 当前页码
            pageSize: 15, // 每页显示条数
            pageTotal: 0, // 总条数
            dialogShow: false, // 新增对话框状态
            compileShow: false, // 编辑对话框状态
            contractor: [], // 所属参建单位选项
            contractorValue: '', // 所属参建单位id
            pid: 0, // 项目id
            teamName: '', // 班组名
            remark: '', // 备注
            selectionId: '', // 当前选中的id
            searchTeamName: '', // 搜索的班组名称
        }
    },
    created() {
        this.getProjectId()
        this.getContractorList()
        this.selectHjTeamList()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.pid = sessionStorage.getItem('pid')
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

        // 当前选中的行数
        handleSelectionChange(val) {
            // console.log(val)
            let temp = ''
            for (let i = 0; i < val.length; i++) {
                if (i == val.length-1) {
                    temp+=(val[i].id)
                } else {
                    temp+=(val[i].id+',')
                }
            }
            this.selectionId = temp
            console.log(this.selectionId)
        },

        // 获取参建单位
        getContractorList() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyList?projectId=${this.pid}`).then(
                res => {
                    // console.log(res.data.data.rows)
                    this.contractor = res.data.data.rows
                }
            )
        },

        // 新增对话框状态切换
        dialogClick() {
            this.remark = ''
            this.teamName = ''
            this.contractorValue = ''
            this.dialogShow = !this.dialogShow
        },

        // 新增班组
        insertHjTeam() {
            if (this.contractorValue && this.teamName) {
                this.$axios.post(`/api/pcCompanyLibrary/insertHjTeam?projectId=${this.pid}&teamName=${this.teamName}&constructionId=${this.contractorValue}&remark=${this.remark}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.selectHjTeamList()
                        } else {
                            this.$message({
                                message: '添加失败，请重试',
                                type: 'error'
                            })
                        }
                    }
                )
            } else {
                this.$message({
                    message: '带 * 号的输入框不得为空',
                    type: 'warning'
                })
            }
        },

        // 获取班组列表
        selectHjTeamList() {
            this.$axios.post(`/api/pcCompanyLibrary/selectHjTeamList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    console.log(res.data.data.rows)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1,
                            project: res.data.data.rows[i].projectName,
                            contractorName: res.data.data.rows[i].companyName,
                            contractorNumber: res.data.data.rows[i].constructionId,
                            name: res.data.data.rows[i].teamName,
                            id: res.data.data.rows[i].id
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 删除
        deleteClick() {
            // console.log(this.selectionId)
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择班组',
                    type: 'warning'
                })
            } else {
                this.$confirm('是否要删除选中的班组？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(`/api/pcCompanyLibrary/deleteHjTeam?ids=${this.selectionId}`).then(
                        res => {
                            console.log(res.data)
                            if (res.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.selectHjTeamList()
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
            }
        },

        // 根据id获取班组信息
        selectHjTeamId() {
            this.$axios.post(`/api/pcCompanyLibrary/selectHjTeamId?id=${Number(this.selectionId)}`).then(
                res => {
                    this.contractorValue = res.data.data.constructionId
                    this.teamName = res.data.data.teamName
                    this.remark = res.data.data.remark?res.data.data.remark:''
                    // console.log(res.data)
                }
            )
        },

        // 编辑
        compileClick() {
            // this.compileShow = !this.compileShow
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择班组',
                    type: 'warning'
                })
            } else if (this.selectionId.includes(',')) {
                this.$message({
                    message: '一次只能编辑一个班组',
                    type: 'warning'
                })
            } else {
                // console.log(Number(this.selectionId))
                this.compileShow = true
                this.selectHjTeamId()
            }
        },

        // 编辑信息
        updateHjTeam() {
            if (this.contractorValue && this.teamName) {
                this.$axios.post(`/api/pcCompanyLibrary/updateHjTeam?id=${Number(this.selectionId)}&projectId=${this.pid}&teamName=${this.teamName}&constructionId=${this.contractorValue}&remark=${this.remark}`).then(
                    res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.compileShow = false
                            this.pageNum = 1
                            this.searchClick()
                        } else {
                            this.$message({
                                message: '修改失败，请重试',
                                type: 'error'
                            })
                        }
                    }
                )
            } else {
                this.$message({
                    message: '带 * 号的输入框不得为空',
                    type: 'warning'
                })
            }
        },

        // 搜索
        searchClick() {
            this.$axios.post(`/api/pcCompanyLibrary/selectHjTeamList?projectId=${this.pid}&pageNum=1&pageSize=${this.pageSize}&teamName=${this.searchTeamName}&constructionId=${this.contractorValue}`).then(
                res => {
                    let temp = []
                    if (res.data.data.rows) {
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1,
                                project: res.data.data.rows[i].projectName,
                                contractorName: res.data.data.rows[i].companyName,
                                contractorNumber: res.data.data.rows[i].constructionId,
                                name: res.data.data.rows[i].teamName,
                                id: res.data.data.rows[i].id
                            })
                        }
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/pcCompanyLibrary/selectHjTeamList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&teamName=${this.searchTeamName}&constructionId=${this.contractorValue}`).then(
                res => {
                    if (res.data.data.rows.length) {
                        let temp = []
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1,
                                project: res.data.data.rows[i].projectName,
                                contractorName: res.data.data.rows[i].companyName,
                                contractorNumber: res.data.data.rows[i].constructionId,
                                name: res.data.data.rows[i].teamName,
                                id: res.data.data.rows[i].id
                            })
                        }
                        this.pageTotal = res.data.data.total
                        this.tableData = temp
                    } 
                }
            )
        },

        // 导出Excel
        deriveClick() {
            location.href=`http://47.106.71.3:8080/api/pcCompanyLibrary/export?projectId=${this.pid}&teamName=${this.searchTeamName}&constructionId=${this.contractorValue}`
        },
    }
}
</script>
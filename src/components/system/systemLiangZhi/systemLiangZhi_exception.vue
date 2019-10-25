<template>
    <div id="systemLiangZhi_exception">
        <div class="content-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>&#12288;&#12288;姓名：</span>
                            <input type="text" v-model="userName">
                        </li>
                        <li class="date">
                            <span>&#12288;&#12288;日期：</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="getTime">
                            </el-date-picker>
                        </li>
                        <li style="width:3.5rem"></li>
                        <li style="width:3.5rem"></li>
                    </ul>
                    <!-- <ul class="bottom-input">
                        <li>
                            <span>所属单位：</span>
                            <el-select v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractorOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                    </ul> -->
                </div>
                <a class="search-button" @click="searchClick">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <!-- <a class="dispose">
                        <i class="icon"></i>
                        处理
                    </a> -->
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
                        prop="userName"
                        label="姓名"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="loggingTag"
                        label="对接平台"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="loggingType"
                        label="异常类型"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.loggingType==0?'考勤':scope.row.loggingType==1?'进场':scope.row.loggingType==2?'退场':''}}
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="inOut"
                        label="考勤类型"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.inOut=='in'?'上班':scope.row.inOut=='out'?'下班':''}}
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="loggingMessage"
                        label="异常原因">
                        </el-table-column>
                        <el-table-column
                        prop="loggingTime"
                        label="时间">
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
    </div>
</template>

<style lang="less">
    #systemLiangZhi_exception {
        width: 100%;
        .content-box {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: .9rem;
                padding: 0 .2rem;
                position: relative;
                border-bottom: .1rem solid #f7f7f7;
                .left-box {
                    float: left;
                    width: 100%;
                    height: .6rem;
                    padding-top: .2rem;
                    ul {
                        width: 100%;
                        height: .4rem;
                        display: flex;
                        justify-content: space-between;
                        li {
                            height: .4rem;
                            div {
                                height: .4rem;
                            }
                            span {
                                float: left;
                                height: .4rem;
                                font-size: .18rem;
                                line-height: .4rem;
                            }
                            input {
                                float: left;
                                width: 2.6rem;
                                height: .4rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                vertical-align: middle;
                                border: .01rem solid #b6b6b6;
                            }
                        }
                        .date {
                            .el-date-editor {
                                width: 2.6rem;
                                height: .4rem;
                                overflow: hidden;
                                border: .01rem solid #b6b6b6;
                                span {
                                    padding: 0;
                                    width: .28rem;
                                    padding-left: .1rem;
                                }
                                input {
                                    border: 0;
                                    width: .95rem;
                                }
                            }
                        }
                    }
                    .bottom-input {
                        margin-top: .2rem;
                    }
                }
                .search-button {
                    top: .2rem;
                    right: .2rem;
                    color: #fff;
                    height: .4rem;
                    width: 1.63rem;
                    font-size: .2rem;
                    text-align: center;
                    position: absolute;
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
                    .dispose {
                        .icon {
                            background-image: url('../../../../static/images/system-dispose.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-disposeHover.png');
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
                        .red-color {
                            color: #fd5101;
                        }
                        .yellow-color {
                            color: #ffd14f;
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
                height: 4.92rem;
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
                    height: 3.52rem;
                    ul{
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
            dateValue: '', // 日期
            projectId: 0, // 项目id
            pageNum: 1, // 当前页
            pageSize: 15, // 每页显示条数
            pageTotal: 1, // 总条数
            userName: '', // 姓名
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            ids: '', // 需要删除的记录的id
        }
    },
    created() {
        this.getProjectId()
        this.getLog()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
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

        // 当前选中的记录
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
            this.ids = temp
            // console.log(this.ids)
        },

        // 获取开始时间与结束时间
        getTime() {
            // console.log(this.dateValue)
            this.dateValue?this.startTime = this.dateValue[0]:this.startTime=''
            this.dateValue?this.endTime = this.dateValue[1]:this.endTime=''
        },

        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 新增对话框状态切换
        dialogClick() {
            this.dialogShow = !this.dialogShow
        },

        // 获取异常记录数据
        getLog() {
            this.$axios.post(`/api/HjLogging/getLog?projectId=${this.projectId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then (
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
            this.$axios.post(`/api/HjLogging/getLog?projectId=${this.projectId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&userName=${this.userName}&startTime=${this.startTime}&endTime=${this.endTime}`).then (
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/HjLogging/getLog?projectId=${this.projectId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&userName=${this.userName}&startTime=${this.startTime}&endTime=${this.endTime}`).then (
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 删除
        deleteClick() {
            if (this.ids == '') {
                this.$message({
                    message: '未选择异常记录',
                    type: 'warning'
                })
            } else {
                this.$confirm('是否要删除选中的异常记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(`/api/HjLogging/remove?ids=${this.ids}`).then(
                        res => {
                            if (res.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.searchClick()
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

        // 导出Excel
        deriveClick() {
            location.href=`http://47.106.71.3:8080/api/HjLogging/getLoggingExcel?projectId=${this.projectId}&userName=${this.userName}&startTime=${this.startTime}&endTime=${this.endTime}`
        },
    }
}
</script>